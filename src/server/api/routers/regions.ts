import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

const regions = [
  {
    name: "Oranie",
    about:
      "Magnificent beaches and large ports, this is what sums up Oranie well, and a culture that goes beyond history.",
    description: `Magnificent beaches and large ports, this is what sums up Oranie well. Nicknamed "El Bahia" (the radiant one), Oran is the second city in the country. Its coast is dotted with beaches, some of which are among the wildest in the Mediterranean. Coming from a turbulent colonial past (Spanish, Turkish, and French), the region has been able to form its own identity. She is today recognized for its impressive cultural heritage, including raï. This style of music, as rebellious as it is sensual, has become the city's ambassador throughout the world.
  The second city of Oranie, Tlemcen, located at an altitude of 800 m, is the only city in Algeria to be able to boast of having Moorish buildings of the quality of those of Andalusia. Nowadays, the so-called "city of cherries" is a place conducive to relaxation and one of the most pleasant to visit. Mostaganem has, for its part, kept an old character, but has also opened up to a modern economy. As proof, just go to the new district of Tijdit, where the beautiful surrounding beaches allow you to enjoy the sun.`,
  },
  {
    name: "Algérois",
    about:
      "The Algérois region boasts of stunning Mediterranean coastlines and a rich cultural heritage.",
    description: `The Algérois region, also known as the Algiers region, is located in the north of Algeria and is home to the country's capital city, Algiers. With a rich history dating back to ancient times, Algiers is a vibrant and bustling city that is a mix of old and new. The Casbah of Algiers, a UNESCO World Heritage site, is a maze of narrow streets and alleys that are home to historic mosques, palaces, and other buildings. The region is also known for its beautiful beaches, such as those in Tipaza and Cherchell, which offer crystal-clear waters and stunning scenery.
    Other wilayas in the Algérois region include Blida, Boumerdès, Médéa, and Bouira, each with its own unique history and culture. Whether you're interested in exploring ancient ruins, relaxing on the beach, or immersing yourself in local culture, the Algérois region has something for everyone.`,
  },
  {
    name: "Grande Kabylie",
    about:
      "The rugged terrain of Grande Kabylie, in Tizi Ouzou, Bouira and Boumerdes, offers stunning views and a unique Kabyle culture.",
    description: `Despite its title, it's in fact smaller when compared to Petite Kabylie, but it's named so for its significant cultural and historical importance, comprising Tizi Ouzou, Boumerdes, and Bouira wilayas, is a rugged and mountainous area located in the eastern part of the Kabylie region in Algeria. It is home to the majority of the Kabyle people, who have a unique culture and language. The region boasts breathtaking landscapes, including the Djurdjura Mountains, which offer stunning views and numerous trekking opportunities. Grande Kabylie is also renowned for its rich history, with several important historical sites and landmarks, such as the Kabyle forts and ancient tombs.
    The region is also known for its cuisine, which includes specialties like couscous, tajines, and kabyle-style dishes. Despite its relatively small size, Grande Kabylie is a treasure trove of natural beauty, culture, and history that is definitely worth exploring.`,
  },
  {
    name: "Petite Kabylie",
    about:
      "Petite Kabylie is a picturesque region in northeastern Algeria, known for diverse landscapes, rich history, and vibrant markets.",
    description: `Petite Kabylie, also known as Little Kabylie, is a region in northern Algeria that encompasses the wilayas of Bejaia, Bordj Bou Arreridj, Skikda, Mila, Jijel, and Sétif. It is characterized by its diverse landscapes, ranging from lush forests and mountain ranges to fertile plains and coastal areas. The region is known for its unique culture and history, with a mix of Berber, Arab, and Mediterranean influences.
    Petite Kabylie is also famous for its vibrant music and arts scene, with traditional Kabyle music and dance still popular among locals. The region is renowned for its delicious cuisine, which features a mix of Mediterranean and Berber flavors. The region's bustling ports and industrial centers have attracted many foreign investors in recent years, leading to a growth in infrastructure and job opportunities.
    In short, Petite Kabylie is a beautiful and diverse region with a rich history, culture, and economy, making it a must-visit destination for anyone exploring Algeria.`,
  },
  {
    name: "Constantinois",
    about:
      "Constantinois is a region in the northeast of Algeria, known for its beautiful beaches and rich history.",
    description: `Constantinois is a region in the northeast of Algeria. It is characterized by its beautiful beaches, lush forests, and rich history. The region is home to the city of Constantine, which is known for its ancient ruins and beautiful architecture. The region is also home to the city of Annaba, which is famous for its beautiful beaches and rich history.`,
  },
  {
    name: "Atlas Sahraoui",
    about:
      "Atlas Sahraoui is a region in the midwest of Algeria or known for being predesert",
    description: `Atlas Sahraoui is a region in the midwest of Algeria or known for being predesert`,
  },
  {
    name: "Aurès",
    about:
      "Aurès is a region in mideast of Algeria, known for its rich history and wonderful nature",
    description:
      "Aurès is a region in mideast of Algeria, known for its rich history and wonderful nature",
  },
  {
    name: "Toggourt",
    about:
      "Toggourt is a region in the mideast of Algeria, known for its rich history and wonderful nature",
    description:
      "Toggourt is a region in the mideast of Algeria, known for its rich history and wonderful nature",
  },
  {
    name: "Le M'Zab",
    about:
      "M'Zab is a region in middle of Algeria, encompasses the wilayas of Ghardaia and El Meniaa, and is home to Beni M'Zab",
    description:
      "M'Zab is a region in middle of Algeria, encompasses the wilayas of Ghardaia and El Meniaa, and is home to Beni M'Zab",
  },
  {
    name: "Saoura",
    about:
      "Saoura is a region in the southwest of Algeria, known for its rich history and wonderful nature",
    description:
      "Saoura is a region in the southwest of Algeria, known for its rich history and wonderful nature",
  },
  {
    name: "Oasis",
    about:
      "Oasis is a region in the southeast of Algeria, known for its rich history and wonderful nature",
    description:
      "Oasis is a region in the southeast of Algeria, known for its rich history and wonderful nature",
  },
];

export const regionsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.region.findMany({
      include: {
        wilayas: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }),
  getOne: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const region = await ctx.prisma.region.findFirst({
        where: {
          name: input.name,
        },
        include: {
          wilayas: {
            select: {
              name: true,
              about: true,
              id: true,
            },
          },
        },
      });
      return region;
    }),
  createRegion: privateProcedure
    .input(
      z.object({
        name: z.string(),
        about: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const region = await ctx.prisma.region.create({
        data: {
          name: input.name,
          about: input.about,
          description: input.description,
        },
      });
      return region;
    }),
  createMany: privateProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.region.deleteMany({});
    await ctx.prisma.$executeRaw`ALTER TABLE Region AUTO_INCREMENT = 1;`;
    const regionsAdded = await ctx.prisma.region.createMany({
      data: regions,
    });
    return regionsAdded;
  }),
});
