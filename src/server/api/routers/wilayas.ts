import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

// wilaya is a city in geographical position Algeria with surprises to blow you away.

const wilayas = [
  {
    name: "Tlemcen",
    nickname: "Tlemcen",
    about:
      "Historic city with rich heritage, stunning architecture, and vibrant culture. Must-visit destination in northwest Algeria.",
    description: `A city rich in history, culture, and heritage. Explore ancient ruins, magnificent mosques, and historic landmarks. Visit the grand Tlemcen National Park, admire the stunning architecture of the Great Mosque, and explore the exquisite El Mechouar Palace. Immerse yourself in Berber, Arab, and French influences.
      
      Discover local cuisine, music, and traditions. A must-visit destination for history buffs, art enthusiasts, and culture seekers.`,
    weather:
      "Tlemcen's climate is characterized by mild winters and hot summers. Experience the pleasant Mediterranean climate with comfortable temperatures, clear skies, and refreshing breezes. Ideal for outdoor activities, leisurely strolls, and enjoying the picturesque landscapes. The city's climate adds to its charm, making it a perfect destination for year-round travel.",
    transportation: "",
    regionId: 1,
  },
  {
    name: "Ain Temouchent",
    nickname: "Ain Temouchent",
    about:
      "Ain Temouchent is a city in northwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 1,
  },
  {
    name: "Oran",
    nickname: "El Bahia",
    about:
      "Magnificent beaches and large ports, this is what sums up Oranie well, and a culture that goes beyond history.",
    description: `Its namesake, Oran, is a port city in northwest Algeria, known as the birthplace of rai folk music.

    Fort Santa Cruz, an Ottoman citadel rebuilt by the Spanish, sits atop Mount Murdjadjo and has views of the bay below. Nearby is the whitewashed Chapelle Santa Cruz, built after a cholera epidemic. In La Blanca, the Turkish old town, is the 18th-century Pacha Mosque with an octagonal minaret. Nearby, Kasr El Bey is an Ottoman palace.`,
    weather: `The climate of Oran is Mediterranean, with mild, rainy winters and hot, sunny summers. 

    The city also is windy, as it is affected by the typical winds of the Alboran Sea, the west and east wind.
    Sometimes, it can even snow. However, snow is much more common in the hills behind the town.`,
    transportation: `The city of Oran occupies a strategic location with a port and an airport of international standards oriented towards the transport of passengers and goods.

    Road transport is divided into two types, urban and semi-urban, which is secured by buses, taxis.`,
    regionId: 1,
  },
  {
    name: "Mostaganem",
    nickname: "Mostaganem",
    about:
      "Mostaganem is a city in northwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 1,
  },
  {
    name: "Sidi Bel Abbès",
    nickname: "Sidi Bel Abbès",
    about:
      "Sidi Bel Abbès is a city in northwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 1,
  },
  {
    name: "Mascara",
    nickname: "Mascara",
    about:
      "Mascara is a city in northwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 1,
  },
  {
    name: "Relizane",
    nickname: "Relizane",
    about:
      "Relizane is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 1,
  },
  {
    name: "Saïda",
    nickname: "Saïda",
    about:
      "Saïda is a city in northwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 1,
  },
  {
    name: "Tiaret",
    nickname: "Tiaret",
    about:
      "Tiaret is a city in northwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 1,
  },
  {
    name: "Tissemsilt",
    nickname: "Tissemsilt",
    about:
      "Tissemsilt is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 1,
  },
  {
    name: "Chlef",
    nickname: "Chlef",
    about: "Chlef is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 2,
  },
  {
    name: "Tipaza",
    nickname: "Tipaza",
    about: "Tipaza is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 2,
  },
  {
    name: "Algiers",
    nickname: "El Behdja",
    about:
      "Algiers is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 2,
  },
  {
    name: "Aïn Defla",
    nickname: "Aïn Defla",
    about:
      "Aïn Defla is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 2,
  },
  {
    name: "Blida",
    nickname: "Blida",
    about: "Blida is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 2,
  },
  {
    name: "Médéa",
    nickname: "Médéa",
    about: "Médéa is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 2,
  },
  {
    name: "Boumerdès",
    nickname: "Boumerdès",
    about:
      "Boumerdès is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 3,
  },
  {
    name: "Tizi Ouzou",
    nickname: "Tizi Ouzou",
    about:
      "Tizi Ouzou is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 3,
  },
  {
    name: "Bouira",
    nickname: "Bouira",
    about: "Bouira is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 3,
  },
  {
    name: "Béjaïa",
    nickname: "Béjaïa",
    about:
      "Béjaïa is a city in northeast of Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 4,
  },
  {
    name: "Jijel",
    nickname: "Jijel",
    about:
      "Jijel is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 4,
  },
  {
    name: "Skikda",
    nickname: "Skikda",
    about:
      "Skikda is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 4,
  },
  {
    name: "Bordj Bou Arreridj",
    nickname: "Bordj Bou Arreridj",
    about:
      "Bordj Bou Arreridj is a city in north Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 4,
  },
  {
    name: "Sétif",
    nickname: "Sétif",
    about:
      "Sétif is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 4,
  },
  {
    name: "Mila",
    nickname: "Mila",
    about:
      "Mila is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 4,
  },
  {
    name: "Annaba",
    nickname: "Annaba",
    about:
      "Annaba is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 5,
  },
  {
    name: "El Tarf",
    nickname: "El Tarf",
    about:
      "El Tarf is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 5,
  },
  {
    name: "Constantine",
    nickname: "Constantine",
    about:
      "Constantine is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 5,
  },
  {
    name: "Guelma",
    nickname: "Guelma",
    about:
      "Guelma is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 5,
  },
  {
    name: "Souk Ahras",
    nickname: "Souk Ahras",
    about:
      "Souk Ahras is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 5,
  },
  {
    name: "Naâma",
    nickname: "Naâma",
    about: "Naâma is a city in west Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 6,
  },
  {
    name: "El Bayadh",
    nickname: "El Bayadh",
    about:
      "El Bayadh is a city in west Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 6,
  },
  {
    name: "Laghouat",
    nickname: "Laghouat",
    about:
      "Laghouat is a city in midwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 6,
  },
  {
    name: "Djelfa",
    nickname: "Djelfa",
    about:
      "Djelfa is a city in midwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 6,
  },
  {
    name: "M'Sila",
    nickname: "M'Sila",
    about:
      "M'Sila is a city in midwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 6,
  },
  {
    name: "Batna",
    nickname: "Batna",
    about:
      "Batna is a city in northeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 7,
  },
  {
    name: "Oum El Bouaghi",
    nickname: "Oum El Bouaghi",
    about:
      "Oum El Bouaghi is a city in northeast of Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 7,
  },
  {
    name: "Biskra",
    nickname: "Biskra",
    about:
      "Biskra is a city in southeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 7,
  },
  {
    name: "Khenchela",
    nickname: "Khenchela",
    about:
      "Khenchela is a city in mideast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 7,
  },
  {
    name: "Tébessa",
    nickname: "Tébessa",
    about: "Tébessa is a city in east Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 7,
  },
  {
    name: "Ouled Djellal",
    nickname: "Ouled Djellal",
    about:
      "Ouled Djellal is a city in southeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 8,
  },
  {
    name: "M'ghair",
    nickname: "M'ghair",
    about:
      "M'ghair is a city in mideast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 8,
  },
  {
    name: "Toggourt",
    nickname: "Toggourt",
    about:
      "Toggourt is a city in southeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 8,
  },
  {
    name: "El Oued",
    nickname: "El Oued",
    about:
      "El Oued is a city in southeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 8,
  },
  {
    name: "Ghardaïa",
    nickname: "Ghardaïa",
    about:
      "Ghardaïa is a city in middle of Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 9,
  },
  {
    name: "El Menia",
    nickname: "El Menia",
    about:
      "El Menia is a city in middle of Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 9,
  },
  {
    name: "Béchar",
    nickname: "Béchar",
    about:
      "Béchar is a city in southwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 10,
  },
  {
    name: "Béni Abbès",
    nickname: "Béni Abbès",
    about:
      "Béni Abbès is a city in southwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 10,
  },
  {
    name: "Timimoun",
    nickname: "Timimoun",
    about:
      "Timimoun is a city in middle of Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 10,
  },
  {
    name: "Tindouf",
    nickname: "Tindouf",
    about:
      "Tindouf is a city in southwest Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 10,
  },
  {
    name: "Adrar",
    nickname: "Adrar",
    about: "Adrar is a city in south Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 10,
  },
  {
    name: "Bordj Badji Mokhtar",
    nickname: "Bordj Badji Mokhtar",
    about:
      "Bordj Badji Mokhtar is a city in south Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 10,
  },
  {
    name: "Ouargla",
    nickname: "Ouargla",
    about:
      "Ouargla is a city in southeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 11,
  },
  {
    name: "In Salah",
    nickname: "In Salah",
    about:
      "In Salah is a city in middle of Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 11,
  },
  {
    name: "Illizi",
    nickname: "Illizi",
    about:
      "Illizi is a city in southeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 11,
  },
  {
    name: "Tamanrasset",
    nickname: "Tamanrasset",
    about:
      "Tamanrasset is a city in south Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 11,
  },
  {
    name: "Djanet",
    nickname: "Djanet",
    about:
      "Djanet is a city in southeast Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 11,
  },
  {
    name: "In Guezzam",
    nickname: "In Guezzam",
    about:
      "In Guezzam is a city in south Algeria with surprises to blow you away.",
    description: "",
    weather: "",
    transportation: "",
    regionId: 11,
  },
];

export const wilayasRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.wilaya.findMany();
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
        nickname: z.string(),
        about: z.string(),
        description: z.string(),
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
          transportation: input.transportation,
          regionId: input.regionId,
        },
      });
      return wilaya;
    }),
  createMany: privateProcedure.mutation(async ({ ctx }) => {
    const wilayasAdded = await ctx.prisma.wilaya.createMany({
      data: wilayas,
    });
    return wilayasAdded;
  }),
});
