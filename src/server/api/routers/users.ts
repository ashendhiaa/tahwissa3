import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.site.findMany();
  }),
  createUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, username, password } = input;

      // Check if user already exists
      const user_exist = await ctx.prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (user_exist) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await ctx.prisma.user.create({
        data: {
          name: name,
          username: username,
          password: hashedPassword,
        },
      });

      return user;
    }),
  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      function exclude<User, Key extends keyof User>(
        user: User,
        keys: Key[]
      ): Omit<User, Key> {
        for (const key of keys) {
          delete user[key];
        }
        return user;
      }
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
      if (user) {
        const userWithoutPassword = exclude(user, ["password"]);
        return userWithoutPassword;
      }
    }),
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { username, password } = input;
      const user = await ctx.prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect password",
        });
      }

      const userId = {
        userId: user.id,
      };

      const token = jwt.sign(userId, process.env.JWT_SECRET!);

      return { accessToken: token };
    }),
});
