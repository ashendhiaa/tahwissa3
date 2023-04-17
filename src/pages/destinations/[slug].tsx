import { useState, useCallback, useRef, useEffect } from "react";
import { useStateRef } from "../../hooks";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Link from "next/link";

const Wilayas = ({ region }: { region: any }) => {
  const [wilayas, setWilayas] = useState<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [left, setLeft] = useState(0);
  const [back, setBack] = useState(false);
  const [forward, setForward] = useState(true);
  const sectionRef = useRef<HTMLUListElement>(null);

  const goBack = () => {
    setCurrentIndex(currentIndex - 1);
    if (sectionRef.current) {
      sectionRef.current.style.transform = `translate(${
        left + 27.278566666666666
      }vw)`;
    }

    const updatedWilayas = [...wilayas];
    updatedWilayas.forEach((wilaya) => wilaya?.classList.add("lighten"));
    updatedWilayas[currentIndex]?.classList.remove("darken");
    updatedWilayas[currentIndex - 1]?.classList.add("darken");
    updatedWilayas[currentIndex - 1]?.classList.remove("lighten");
    setWilayas(() => updatedWilayas);

    setLeft(left + 27.278566666666666);
    if (currentIndex === 1) {
      setBack(false);
    } else {
      setForward(true);
    }
  };

  const goForward = () => {
    setCurrentIndex(currentIndex + 1);
    if (sectionRef.current) {
      sectionRef.current.style.transform = `translate(${
        left - 27.278566666666666
      }vw)`;
    }

    const updatedWilayas = [...wilayas];
    updatedWilayas.forEach((wilaya) => wilaya.classList.add("lighten"));
    updatedWilayas[currentIndex]?.classList.remove("darken");
    updatedWilayas[currentIndex + 1]?.classList.add("darken");
    updatedWilayas[currentIndex + 1]?.classList.remove("lighten");
    setWilayas(() => updatedWilayas);

    setLeft(left - 27.278566666666666);
    if (currentIndex === 8) {
      setForward(false);
    } else {
      setBack(true);
    }
  };

  const goToExactRegion = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      const updatedWilayas = [...wilayas];
      console.log("hello");

      updatedWilayas.forEach((wilaya) => wilaya.classList.add("lighten"));
      updatedWilayas[currentIndex]?.classList.remove("darken");
      updatedWilayas[index]?.classList.add("darken");
      updatedWilayas[index]?.classList.remove("lighten");

      if (index < currentIndex) {
        sectionRef.current!.style.transform = `translate(${
          left + (currentIndex - index) * 27.278566666666666
        }vw)`;
        if (index === 0) {
          setBack(false);
        }
        setForward(true);
        setLeft(left + (currentIndex - index) * 27.278566666666666);
      } else if (index > currentIndex) {
        sectionRef.current!.style.transform = `translate(${
          left - (index - currentIndex) * 27.278566666666666
        }vw)`;
        if (index === 9) {
          setForward(false);
        }
        setBack(true);
        setLeft(left - (index - currentIndex) * 27.278566666666666);
      }

      setWilayas(() => updatedWilayas);
    },
    [wilayas]
  );

  const handleSwitch = (index: number) => () => {
    goToExactRegion(index);
  };

  useEffect(() => {
    if (document.getElementById("region") !== null) {
      const fetching = async () => {
        const response = await fetch(
          `https://ik.imagekit.io/vaqzdpz5y/assets/images/${region.id}/3.svg`
        );
        const svgContent = await response.text();
        console.log("hello");
        document.getElementById("region")!.innerHTML = svgContent;
        document.getElementById("svg2")!.style.width = "100%";
        const wilayat = [];
        for (let i = 1; i < 11; i++) {
          const wilaya = document.getElementById(`${i}`);
          if (wilaya) wilayat.push(wilaya);
        }
        setWilayas(wilayat);
      };
      fetching();
    }
  }, []);

  useEffect(() => {
    const wilayat: HTMLElement[] = [];
    for (let i = 1; i < 11; i++) {
      const wilaya = document.getElementById(`${i}`);
      if (wilaya) {
        wilaya.addEventListener("click", handleSwitch(i - 1));
        wilayat.push(wilaya);
      }
    }

    return () => {
      wilayat.forEach((wilaya, i) => {
        wilaya.removeEventListener("click", handleSwitch(i - 1));
      });
    };
  }, [wilayas, handleSwitch]);

  return (
    <div className="row ml-[9.049479166666668vw] mt-[2.864583333333333vw] gap-[6.8359375vw]">
      <div className="col gap-[1.8229166666666667vw] pt-[3vw]">
        <h3 className="text-[2.864583333333333vw] font-extrabold leading-[3.1901041666666665vw] text-newBlack">
          {region.name}
        </h3>
        <div className="relative">
          <div className="block w-[26.041666666666668vw] overflow-hidden">
            <ul
              className="row w-full gap-[1.2369vw] duration-500 ease-in-out"
              ref={sectionRef}
            >
              {region.wilayas.map((wilaya: any, i: number) => {
                return (
                  <li
                    className="box-content aspect-[0.9237875288683602] w-full flex-none overflow-hidden rounded-t-[0.78125vw] "
                    key={i}
                  >
                    <Link href="/destinations">
                      <div
                        style={{
                          backgroundImage: `url('https://ik.imagekit.io/vaqzdpz5y/assets/images/${region.id}/${wilaya.id}/0.png')`,
                        }}
                        className="relative h-[21.158854166666664vw] w-full bg-cover bg-center pt-[15.7vw]"
                      >
                        <h3 className="text-center text-[2.604166666666667vw] font-extrabold text-white ">
                          {wilaya.name}
                        </h3>
                      </div>
                      <div className="col h-[11.71875vw] gap-[0.8vw] rounded-b-[0.78125vw] border-2 border-black px-[1.0416666666666665vw] py-[1vw]">
                        <p className="text-[1.0416666666666665vw] font-medium leading-[1.26953125vw] text-newGrey">
                          {wilaya.about}
                        </p>
                      </div>
                    </Link>
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
      <div id="region" className="w-[51.5625vw]"></div>
    </div>
  );
};

const Region = () => {
  const router = useRouter();
  const region = router.query.slug;

  if (typeof region !== "string") {
    return null;
  }

  const words = region.split(" ");

  const regionCapital = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const regionCapitalString = regionCapital.join(" ");

  const { data, isLoading } = api.regions.getOne.useQuery({
    name: regionCapitalString,
  });

  if (!data || isLoading) return <div>Loading...</div>;

  return (
    <main>
      <header
        style={{
          backgroundImage: `url('https://ik.imagekit.io/vaqzdpz5y/assets/images/${data.id}/2.png')`,
        }}
        className="bg-image"
      >
        <div className="absolute left-[10.0911vw] top-[19.46614vw]">
          <h1 className="title text-white">{data.name}</h1>
          <h2 className="bg-semi-title text-white">Destination</h2>
        </div>
      </header>
      <Wilayas region={data} />
    </main>
  );
};

export default Region;
