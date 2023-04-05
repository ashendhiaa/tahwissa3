import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const wilayasRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.site.findMany();
  }),
  getOne: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const wilaya = await ctx.prisma.wilaya.findUnique({
        where: {
          id: input.id,
        },
      });
      return wilaya;
    }),
  createWilaya: privateProcedure
    .input(
      z.object({
        name: z.string(),
        about: z.string(),
        description: z.string(),
        regionId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const wilaya = await ctx.prisma.wilaya.create({
        data: {
          name: input.name,
          about: input.about,
          description: input.description,
          regionId: input.regionId,
        },
      });
      return wilaya;
    }),
});
