import Glide from "@glidejs/glide";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RegionWithWilayas } from "~/types";

class RegionMap {
  wilayas: Array<HTMLElement> = [];
  index: number = 0;

  // function to go to the next region in the map
  goToExactRegion(newIndex: number) {
    const updatedWilayas = [...this.wilayas];

    updatedWilayas.forEach((wilaya) => wilaya.classList.add("lighten"));
    updatedWilayas[this.index]?.classList.remove("darken");
    updatedWilayas[newIndex]?.classList.add("darken");
    updatedWilayas[newIndex]?.classList.remove("lighten");

    this.index = newIndex;
    this.wilayas = updatedWilayas;
  }

  setSvg(
    numberOfWilayas: number,
    svg: string,
    callback: (index: number) => void
  ) {
    document.getElementById("region")!.innerHTML = svg;

    document.getElementById("svg2")!.style.width = "100%";
    for (let i = 1; i <= numberOfWilayas; i++) {
      const wilaya = document.getElementById(`${i}`);
      wilaya?.addEventListener("click", () => {
        this.goToExactRegion(i - 1);
        callback(i - 1);
      });
      if (wilaya) this.wilayas.push(wilaya);
    }
  }
}

const WilayasMap = ({ region }: { region: RegionWithWilayas }) => {
  const [svg, setSvg] = useState<string>();

  const fetchData = async () => {
    const response = await fetch(
      `https://ik.imagekit.io/vaqzdpz5y/assets/images/${region.id}/0.svg`
    );
    const svgContent = await response.text();
    setSvg(svgContent);
  };

  const [slider] = useState(
    new Glide(`.${region.name}`, {
      type: "slider",
      perView: 1,
      bound: true,
      rewind: false,
      startAt: 0,
    })
  );

  const [map] = useState(new RegionMap());

  const svgRef = useRef<HTMLDivElement>(null);
  const [back, setBack] = useState(false);
  const [forward, setForward] = useState(true);

  const goBack = () => {
    slider.go("<");
    if (slider.index === 0) setBack(false);
    setForward(true);
    map.goToExactRegion(slider.index);
  };

  const goForward = () => {
    slider.go(">");
    if (slider.index === region.wilayas.length - 1) setForward(false);
    setBack(true);
    map.goToExactRegion(slider.index);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // mount when component is ready
    slider.mount();
    if (svg) {
      map.setSvg(region.wilayas.length, svg, (index) => {
        slider.go("=" + index);
      });
    }

    slider.on("run.after", () => {
      setBack(true);
      setForward(true);
      if (slider.index === 0) {
        setBack(false);
        setForward(true);
      }
      if (slider.index === region.wilayas.length - 1) {
        setForward(false);
        setBack(true);
      }
      if (map.index !== slider.index) {
        map.goToExactRegion(slider.index);
      }
    });
  }, [svg]);

  return (
    <div className="row ml-[9.049479166666668vw] mt-[5vw] items-center gap-[6.8359375vw]">
      <div className="col gap-[1.8229166666666667vw]">
        <h3 className="text-[2.864583333333333vw] font-extrabold leading-[3.1901041666666665vw] text-newBlack">
          {region.name}
        </h3>
        <div
          className={`${region.name} col relative h-auto w-[26.041666666666668vw] cursor-default`}
        >
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {region.wilayas.map((wilaya: any, i: number) => {
                return (
                  <li className="glide__slide" key={i}>
                    <Link
                      href={`/destinations/${region.name.toLowerCase()}/${wilaya.name.toLowerCase()}`}
                    >
                      <div className="relative h-[21.158854166666664vw] w-full overflow-hidden rounded-t-[0.78125vw]">
                        <div
                          style={{
                            backgroundImage: `url('https://ik.imagekit.io/vaqzdpz5y/assets/images/${region.id}/${wilaya.id}/0.png')`,
                          }}
                          className="zoom h-full w-full bg-cover bg-center"
                        >
                          <h3 className="pt-[15.7vw] text-center text-[2.604166666666667vw] font-extrabold text-white">
                            {wilaya.name}
                          </h3>
                        </div>
                      </div>
                    </Link>
                    <div className="col gap-[0.8vw] rounded-b-[0.78125vw] border-2 border-black px-[1.0416666666666665vw] py-[1.5625vw]">
                      <p className="text-[1.0416666666666665vw] font-medium leading-[1.26953125vw] text-newGrey">
                        {wilaya.about}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            id="back"
            className=" absolute -left-[2.083333333333333vw] top-[13.346354166666666vw] hover:drop-shadow-md disabled:drop-shadow-none "
            onClick={goBack}
            disabled={!back}
          >
            <svg
              className="w-[4.166666666666666vw]"
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
                  strokeWidth="1.02273"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
            className="absolute left-[23.958333333333336vw] top-[13.346354166666666vw] hover:drop-shadow-md disabled:drop-shadow-none "
            onClick={goForward}
            disabled={!forward}
          >
            <svg
              className="w-[4.166666666666666vw]"
              viewBox="0 0 45 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" width="44" height="44" rx="5" fill="#F1F5F6" />
              <g filter="url(#filter0_d_1247_227)">
                <path
                  d="M16.5 33.1431L27.9286 21.7145L16.5 10.2859"
                  stroke="#484848"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
      </div>
      <div ref={svgRef} id="region" className="w-[51.5625vw]"></div>
    </div>
  );
};

export default WilayasMap;
