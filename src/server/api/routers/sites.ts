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
  getTop: publicProcedure.query(async ({ ctx }) => {
    const sites = await ctx.prisma.site.findMany({
      orderBy: {
        visit: "desc",
      },
      take: 6,
    });
    return sites;
  }),
  getTopByWilaya: publicProcedure
    .input(
      z.object({
        wilayaId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const sites = await ctx.prisma.site.findMany({
        where: {
          wilayaId: input.wilayaId,
        },
        orderBy: {
          visit: "desc",
        },
        take: 6,
      });
      return sites;
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
        position: z.array(z.number()),
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
          position: input.position,
        },
      });
      return site;
    }),
});
