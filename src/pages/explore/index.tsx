import { SectionPlaces } from "~/components/Section";
import Glide from "@glidejs/glide";
import { useActions, useAppDispatch } from "../../hooks";
import ScrollContainer from "react-indiana-drag-scroll";
import Image, { type StaticImageData } from "next/image";

import home from "/public/assets/home.jpg";
import about from "/public/assets/about-image.png";
import mosta from "/public/assets/mostaganem.jpg";
import poster from "/public/assets/startup.jpg";
import sqrposter from "/public/assets/star.jpg";
import gallery1 from "/public/assets/gallery1.png";
import gallery2 from "/public/assets/gallery2.png";
import gallery3 from "/public/assets/gallery3.png";
import gallery4 from "/public/assets/gallery4.png";
import { getAllRegions, selectRegionsState } from "~/store/regionsReducer";
import { useSelector } from "react-redux";
import { api } from "~/utils/api";
import { Site } from "@prisma/client";
import { RegionWithWilayas } from "~/types";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// ? This is the Card that defines one Wilaya and its images

const DestinationCard = ({
  wilaya,
  img,
}: {
  wilaya: string;
  img: StaticImageData;
}) => {
  return (
    <button className="relative aspect-[0.99644] w-[27.34375vw] flex-none duration-700 ease-in-out ">
      <Image className="destination-image" src={img} alt="Wilaya" />
      <h2 className="semi-title absolute left-[5.3078vw] top-[21.1061vw] text-white">
        {wilaya}
      </h2>
    </button>
  );
};

// * This is the Section that defines the Top Destinations section
const TopSection = ({
  list,
  img,
}: {
  list: string[];
  img: StaticImageData;
}) => {
  const { ref, currentIndex, goBack, back, goForward, forward } = useActions(
    29.882,
    list.length,
    4
  );

  return (
    <section className="w-full">
      <div className="flex items-center">
        <h3 className="semi-title">Top Destinations</h3>
        <button
          id="back"
          className="ml-[56.38vw] hover:drop-shadow-md disabled:drop-shadow-none "
          onClick={goBack}
          disabled={!back}
        >
          <svg
            className="w-[2.9296vw]"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="44"
              height="44"
              rx="5.11364"
              transform="matrix(-1 0 0 1 44.5 0.00195312)"
              fill="#F1F5F6"
            />
            <g filter="url(#filter0_d_1247_230)">
              <path
                d="M28.5 33.1445L17.0714 21.716L28.5 10.2874"
                stroke="#484848"
                stroke-width="1.02273"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_1247_230"
                x="12.4696"
                y="9.77588"
                width="20.633"
                height="32.0617"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4.09091" />
                <feGaussianBlur stdDeviation="2.04545" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1247_230"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1247_230"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </button>
        <button
          id="forward"
          className=" ml-[1.171875vw] hover:drop-shadow-md disabled:drop-shadow-none"
          onClick={goForward}
          disabled={!forward}
        >
          <svg
            className="w-[2.9296vw]"
            viewBox="0 0 45 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.5" width="44" height="44" rx="5" fill="#F1F5F6" />
            <g filter="url(#filter0_d_1247_227)">
              <path
                d="M16.5 33.1431L27.9286 21.7145L16.5 10.2859"
                stroke="#484848"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_1247_227"
                x="12"
                y="9.78613"
                width="20.4287"
                height="31.8569"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_1247_227"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_1247_227"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </button>
      </div>
      <div className="w-full overflow-hidden">
        <ul
          className="mt-[3.792317vw] flex gap-[2.5390625vw] duration-500 ease-in-out"
          id="top-destinations"
          ref={ref}
        >
          {list.map((wilaya, i) => {
            if (i >= currentIndex && i <= currentIndex + 2) {
              return <DestinationCard key={i} wilaya={wilaya} img={img} />;
            }
            return <DestinationCard key={i} wilaya={wilaya} img={img} />;
          })}
        </ul>
      </div>
    </section>
  );
};

// ? This is the component that renders the Events section

const Happening = ({
  poster,
  sqrposter,
}: {
  poster: StaticImageData;
  sqrposter: StaticImageData;
}) => {
  return (
    <section className="mt-[10.498vw] w-full">
      <h3 className="semi-title ml-[5.9896vw] inline-block">
        Happening Right Now
      </h3>
      <div className="relative mt-[4.2317vw] aspect-[2.77] w-full">
        <Image className="bg-image opacity-20" src={poster} alt="event1" />
        <div className="absolute left-[10.0911vw] top-[5.9121vw]">
          <h2 className="med-title w-[31.640625vw] text-newBlack ">
            Algeria is welcoming Africa
          </h2>
          <p className="paragraph mt-[5.2083vw] w-[23.4375vw] font-medium text-newBlack">
            Learn more about the African Startup Conference
          </p>
        </div>
        <Image
          className="absolute right-[5.9896vw] top-[5.9121vw] aspect-[1.17947] w-[40.2916vw] object-cover "
          src={sqrposter}
          alt="event2"
        />
      </div>
    </section>
  );
};

// ? This is the component that renders the Visit Algeria section

const Gallery = ({ gallery }: { gallery: StaticImageData[] }) => {
  return (
    <section id="" className="mt-[13.28125vw] w-full">
      <h2 className="med-title grid place-items-center">#VisitAlgeria</h2>
      <ScrollContainer className="scroll-container">
        <div className=" flex w-full flex-auto">
          <ul className="mt-[3.90625vw] flex gap-[0.7317vw]">
            {gallery.map((picture, i) => {
              return (
                <Image
                  key={i}
                  className=" h-[22.401vw] object-cover"
                  src={picture}
                  alt={`${i}`}
                />
              );
            })}
          </ul>
        </div>
      </ScrollContainer>
      <ScrollContainer className="scroll-container">
        <div className=" flex w-full flex-auto">
          <ul className="mt-[0.7317vw] flex gap-[0.7317vw]">
            {gallery.map((picture, i) => {
              return (
                <Image
                  key={i}
                  className=" h-[22.401vw] object-cover"
                  src={picture}
                  alt={`${i}`}
                />
              );
            })}
          </ul>
        </div>
      </ScrollContainer>
    </section>
  );
};

const TopSites = dynamic(
  async () => (await import("~/components/Section")).TopSites,
  {
    ssr: false,
  }
);

const Explore = ({
  sites,
  regions,
}: {
  sites: Site[];
  regions: RegionWithWilayas[];
}) => {
  const listWilayas = [
    "Mostaganem",
    "Mostaganem",
    "Mostaganem",
    "Mostaganem",
    "Mostaganem",
    "Mostaganem",
  ];

  const listGallery = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery1,
    gallery2,
  ];

  if (sites.length === 0) {
    return <div>Loading...</div>;
  }

  if (regions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <header>
        <Image className="bg-image" src={home} alt="Home" />
        <div className="absolute left-[10.0911vw] top-[19.46614vw]">
          <h1 className="title text-white">Algeria</h1>
          <h2 className="bg-semi-title text-white">
            The world’s best hidden gem
          </h2>
        </div>
      </header>
      <div className="new-page mx-auto w-[87.1vw]">
        <section id="explore-about" className="mt-[10.5227vw] flex">
          <div>
            <h2 className="med-title inline-block">Why go?</h2>
            <p className="paragraph mt-[4.1666vw] w-[55.7291vw]">
              Situated in north western africa at the croassroads of many
              cultures and civilisations, Algeria the 10th largest country in
              the world has a lot to offer, from the golden beaches of the
              meditteranean coast to the frozen mountaintops of the atlas and
              the mesmerising dunes of the sahara, and here Tahwissa will give
              you all the information you need to know, and the best Sites to
              visit.
            </p>
          </div>
          <Image
            className="image ml-[6.44531vw] mt-[0.651041vw] aspect-[0.87414] w-[24.888vw]"
            src={about}
            alt="about"
          />
        </section>
        <TopSection list={listWilayas} img={mosta} />
        {
          //
        }
        <TopSites section="Must Sees" data={sites} regions={regions} />
      </div>
      <Happening poster={poster} sqrposter={sqrposter} />
      <Gallery gallery={listGallery} />
    </main>
  );
};

const FetcherComponent = () => {
  const dispatch = useAppDispatch();
  dispatch(getAllRegions());
  const regions = useSelector(selectRegionsState);

  const topSites = api.sites.getTop.useQuery().data;

  if (!regions || !topSites) return null;

  return <Explore sites={topSites} regions={regions}></Explore>;
};

export default FetcherComponent;
