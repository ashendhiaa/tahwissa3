import { Region, Site, Wilaya } from "@prisma/client";

export type RegionWithWilayas = Region & {
  wilayas: {
    name: string;
    id: number;
    about: string;
  }[];
};

export type WilayaWithSites = Wilaya & {
  sites: Site[];
};
