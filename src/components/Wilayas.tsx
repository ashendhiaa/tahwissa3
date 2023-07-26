import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

const WilayaCard = ({
  regionId,
  regionName,
  wilaya,
  svgMap,
}: {
  regionId: number;
  regionName: string;
  wilaya: any;
  svgMap: string;
}) => {
  const wilayaRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      node.innerHTML = svgMap;
      if (node.childNodes[0]?.firstChild?.childNodes !== undefined) {
        const children = node.childNodes[0]?.firstChild
          ?.childNodes as unknown as HTMLElement[];
        children!.forEach((child) => {
          if (child.id === `${wilaya.id}`) {
            child.classList.add("redZone");
          }
        });
      }
    }
  }, []);

  return (
    <Link
      href={`/destinations/${regionName.toLowerCase()}/${wilaya.name.toLowerCase()}`}
    >
      <div
        style={{
          backgroundImage: `url('https://ik.imagekit.io/vaqzdpz5y/assets/images/${regionId}/${wilaya.id}/0.png')`,
        }}
        className="aspect-[0.99644] w-[20.833333333333336vw] rounded-xl border-[2px] border-newBlack bg-cover bg-center duration-700 ease-in-out "
      >
        <div
          className="mx-auto mt-[5.924479166666666vw] w-[15.104166666666666vw]"
          id={`${wilaya.name}`}
          ref={wilayaRef}
        ></div>
        <h2 className="mt-2 w-full text-center text-[1.8229166666666667vw] font-extrabold text-white">
          {wilaya.name}
        </h2>
      </div>
    </Link>
  );
};

const Wilayas = ({ region, wilayaId }: { region: any; wilayaId: number }) => {
  const [svgMap, setSvgMap] = useState<string>("");
  useEffect(() => {
    const fetching = async () => {
      const response = await fetch(
        `https://ik.imagekit.io/vaqzdpz5y/assets/images/${region!.id}/2.svg`
      );
      const svgContent = await response.text();
      setSvgMap(svgContent);
    };
    fetching();
  }, []);

  if (!svgMap) return null;

  if (wilayaId !== -1) {
    const filteredWilayas = region.wilayas.filter((regionWilaya: any) => {
      return regionWilaya.id !== wilayaId;
    });
    region = { ...region, wilayas: filteredWilayas };
  }

  return (
    <section id="explore wilayas" className="col items-start">
      <h2 className="semi-title">
        {wilayaId === -1
          ? `Explore ${region.name} by Wilaya`
          : "Explore Nearby Wilayas"}
      </h2>
      <div className=" mt-[2.864583333333333vw] flex flex-wrap justify-start gap-[1.171875vw]">
        {region?.wilayas.map((wilaya: any) => (
          <WilayaCard
            key={wilaya.id}
            regionName={region!.name}
            regionId={region!.id}
            wilaya={wilaya}
            svgMap={svgMap}
          />
        ))}
      </div>
    </section>
  );
};

export default Wilayas;
