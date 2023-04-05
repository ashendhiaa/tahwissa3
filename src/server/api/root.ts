import { createTRPCRouter } from "~/server/api/trpc";
import { sitesRouter } from "./routers/sites";
import { regionsRouter } from "./routers/regions";
import { wilayasRouter } from "./routers/wilayas";
import { usersRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: usersRouter,
  regions: regionsRouter,
  wilayas: wilayasRouter,
  sites: sitesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
