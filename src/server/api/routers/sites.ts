import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const sitesRouter = createTRPCRouter({
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
      const site = await ctx.prisma.site.findUnique({
        where: {
          id: input.id,
        },
      });
      return site;
    }),
  createSite: privateProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        visit: z.number(),
        link: z.string(),
        price: z.number(),
        wilayaId: z.number(),
        longitude: z.number(),
        latitude: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const site = await ctx.prisma.site.create({
        data: {
          name: input.name,
          description: input.description,
          visit: input?.visit || 0,
          link: input.link,
          price: input?.price || 0,
          wilayaId: input.wilayaId,
          longitude: input.longitude,
          latitude: input.latitude,
        },
      });
      return site;
    }),
});
