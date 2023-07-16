import { type StaticImageData } from "next/image";
import Card from "./Card";
import { useState, useRef, useEffect } from "react";

const Section = ({
  section,
  list,
  img,
}: {
  section: string;
  list: {
    name: string;
    location: string;
  }[];
  img: StaticImageData;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [left, setLeft] = useState(0);
  const [margin, setMargin] = useState(0);
  const [back, setBack] = useState(false);
  const [forward, setForward] = useState(true);
  const sectionRef = useRef<HTMLUListElement>(null);
  const h2 = useRef<HTMLHeadingElement>(null);

  const goBack = () => {
    setCurrentIndex(currentIndex - 1);
    if (sectionRef.current) {
      sectionRef.current.style.transform = `translate(${left + 22.08}vw)`;
    }
    setLeft(left + 22.08);
    if (currentIndex === 1) {
      setBack(false);
    } else {
      setForward(true);
    }
  };

  const goForward = () => {
    setCurrentIndex(currentIndex + 1);
    if (sectionRef.current) {
      sectionRef.current.style.transform = `translate(${left - 22.08}vw)`;
    }
    setLeft(left - 22.08);
    if (currentIndex === list.length - 4) {
      setForward(false);
    } else {
      setBack(true);
    }
  };

  useEffect(() => {
    if (h2.current) {
      setMargin(((1185 - h2.current.offsetWidth) * 100) / 1536);
    }
  }, []);

  if (!list) return null;

  return (
    <section className="w-full">
      <div className="flex items-center">
        <h2 ref={h2} className="semi-title">
          {section}
        </h2>
        <button
          id="back"
          className=" hover:drop-shadow-md disabled:drop-shadow-none "
          onClick={goBack}
          disabled={!back}
          style={{ marginLeft: `${margin}vw` }}
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
                className="hover:stroke-[1.4px]"
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
          className=" ml-[1.171875vw] hover:drop-shadow-md disabled:drop-shadow-none "
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
          className="row mt-[4.2317vw] gap-[1.2369vw] duration-500 ease-in-out"
          id={section}
          ref={sectionRef}
        >
          {list.map((element, i) => {
            if (i >= currentIndex && i <= currentIndex + 3) {
              return <Card key={i} element={element} img={img} />;
            }
            return <Card key={i} element={element} img={img} />;
          })}
        </ul>
      </div>
    </section>
  );
};

export default Section;
