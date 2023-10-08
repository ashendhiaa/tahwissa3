import Link from "next/link";
import { useRouter } from "next/router";
import { RegionWithWilayas } from "~/types";

export const Card = ({
  element,
  img,
}: {
  element: {
    name: string;
    location: string;
  };
  img: string;
}) => {
  const { query } = useRouter();

  let { region, wilaya } = query;

  if (typeof region !== "string" || typeof wilaya !== "string") {
    return null;
  }

  if (!element) return null;
  return (
    <li className="aspect-[0.8259] w-[20.833333333333336vw]">
      <Link
        href={`/destinations/${region}/${wilaya}/${element.name.toLowerCase()}`}
      >
        <img className="card-image aspect-[1.036] w-full" src={img} alt="" />
        <div className="aspect-[4.0577] w-full rounded-b-[0.651vw] border-[3px] border-solid border-newBlack px-[0.846vw] pb-[1.006vw] pt-[0.911vw]">
          <h4 className="card-title">{element.name}</h4>
          <p className="card-detail mt-[0.26vw]">{element.location}</p>
        </div>
      </Link>
    </li>
  );
};

export const CardLodging = ({
  element,
  img,
}: {
  element: {
    name: string;
    location: string;
    link: string;
  };
  img: string;
}) => {
  if (!element) return null;
  return (
    <li>
      <a
        href={element.link}
        className={`aspect-[0.8259] w-[20.833333333333336vw] ${
          element.link ? "cursor-pointer" : ""
        }`}
        target="_blank"
      >
        <img className="card-image aspect-[1.036] w-full" src={img} alt="" />
        <div className="aspect-[4.0577] w-full rounded-b-[0.651vw] border-[3px] border-solid border-newBlack px-[0.846vw] pb-[1.006vw] pt-[0.911vw]">
          <h4 className="card-title">{element.name}</h4>
          <p className="card-detail mt-[0.26vw]">{element.location}</p>
        </div>
      </a>
    </li>
  );
};

export const CardSpecial = ({
  region,
  wilaya,
  element,
  img,
}: {
  region: RegionWithWilayas;
  wilaya: any;
  element: {
    name: string;
    location: string;
  };
  img: string;
}) => {
  return (
    <li className="aspect-[0.8259] w-[20.833333333333336vw]">
      <Link
        href={`/destinations/${region.name}/${
          wilaya.name
        }/${element.name.toLowerCase()}`}
      >
        <img className="card-image aspect-[1.036] w-full" src={img} alt="" />
        <div className="aspect-[4.0577] w-full rounded-b-[0.651vw] border-[3px] border-solid border-newBlack px-[0.846vw] pb-[1.006vw] pt-[0.911vw]">
          <h4 className="card-title">{element.name}</h4>
          <p className="card-detail mt-[0.26vw]">{element.location}</p>
        </div>
      </Link>
    </li>
  );
};
