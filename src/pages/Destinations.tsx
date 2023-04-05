import Image from "next/image";
import Algeria from "../../public/assets/Destinations.jpg";

const Destinations = () => {
  return (
    <main>
      <header>
        <Image className="bg-image" src={Algeria} alt="Destinations" />
        <div className="absolute left-[10.0911vw] top-[19.46614vw]">
          <h1 className="title text-white">Algeria</h1>
          <h2 className="bg-semi-title text-white">Destinations</h2>
        </div>
      </header>
    </main>
  );
};

export default Destinations;
