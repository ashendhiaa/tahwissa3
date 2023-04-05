/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *>
 * These allow you to access things when processing a request, like the database, the session, etc.
 */
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import jwt from "jsonwebtoken";
import { prisma } from "~/server/db";

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */

export const createTRPCContext = (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  return {
    prisma,
    req,
    res,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

const checkPermission = t.middleware(async ({ ctx, next }) => {
  const { req } = ctx;

  const token = req.headers.authorization?.substring(7);

  if (!token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource.",
    });
  }

  interface JwtPayload {
    userId: string;
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

  if (!decodedToken.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid token",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: decodedToken.userId,
    },
  });

  if (!user || user.username !== "ADMIN") {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not authorized to access this resource",
    });
  }

  return next({
    ctx: {
      user: user,
    },
  });
});

export const privateProcedure = t.procedure.use(checkPermission);
