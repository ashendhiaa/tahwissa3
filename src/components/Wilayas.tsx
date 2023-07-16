import { useEffect, useState } from "react";
import WilayaCard from "./WilayaCard";

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
