import Link from "next/link";
import Image, { type StaticImageData } from "next/image";

const Card = ({
  element,
  img,
}: {
  element: {
    name: string;
    location: string;
  };
  img: StaticImageData;
}) => {
  return (
    <Link
      href="/"
      className="aspect-[0.8259] w-[20.849vw] flex-none duration-700 ease-in-out"
    >
      <Image className="card-image aspect-[1.036] w-full" src={img} alt="" />
      <div className="border-newBlack aspect-[4.0577] w-full rounded-b-[0.651vw] border-[3px] border-solid bg-[#F8FAFB] px-[0.846vw] pb-[1.006vw] pt-[0.911vw]">
        <h4 className="card-title">{element.name}</h4>
        <p className="card-detail mt-[0.26vw]">{element.location}</p>
      </div>
    </Link>
  );
};
export default Card;
