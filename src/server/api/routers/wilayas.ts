import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const wilayasRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(({ ctx, input }) => {
      const wilayas = ctx.prisma.wilaya.findMany({
        where: {
          regionId: input.id,
        },
      });
      return wilayas;
    }),
  getOne: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const wilaya = await ctx.prisma.wilaya.findUnique({
        where: {
          name: input.name,
        },
      });
      return wilaya;
    }),
  createWilaya: privateProcedure
    .input(
      z.object({
        name: z.string(),
        nickname: z.string(),
        about: z.string(),
        description: z.string(),
        special: z.boolean(),
        food: z.object({
          name: z.string(),
          description: z.string(),
        }),
        weather: z.string(),
        transportation: z.string(),
        regionId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const wilaya = await ctx.prisma.wilaya.create({
        data: {
          name: input.name,
          nickname: input.nickname,
          about: input.about,
          description: input.description,
          weather: input.weather,
          special: input.special,
          food: input.food,
          transportation: input.transportation,
          regionId: input.regionId,
        },
      });
      return wilaya;
    }),
});
