import Slider from "react-slick";
import styles from "~/components/Section.module.css";
import { useSlider } from "~/hooks";
import Card from "./Card";

const SectionPlaces = ({
  section,
  data,
  wilaya,
  regionId,
}: {
  section: string;
  data: any;
  wilaya: any;
  regionId: number;
}) => {
  const { sliderRef, afterChange, goBack, goForward, back, forward } =
    useSlider(4);

  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    afterChange: afterChange,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  if (!data) return null;

  return (
    <section
      id="Must"
      className={`${styles.sliderWrapper} col sliderWrapper w-full gap-[4.231770833333334vw]`}
    >
      <div className="flex w-full items-center justify-between">
        <h3 className="semi-title">{section}</h3>
        <div className="row gap-[1.171875vw]">
          <button
            id="back"
            className="hover:drop-shadow-md disabled:drop-shadow-none "
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
            className="  hover:drop-shadow-md disabled:drop-shadow-none"
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
      </div>
      <Slider ref={sliderRef} {...settings}>
        {data.map(
          (
            item: { name: any; id: any },
            index: React.Key | null | undefined
          ) => {
            return (
              <Card
                key={index}
                element={{
                  name: item.name,
                  location: `${wilaya.name}, ${wilaya.name} province`,
                }}
                img={`https://ik.imagekit.io/vaqzdpz5y/assets/images/${regionId}/${wilaya.id}/Sites/${item.id}/images/1.png`}
              />
            );
          }
        )}
      </Slider>
    </section>
  );
};

export default SectionPlaces;
