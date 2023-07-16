import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), { ssr: false });
import Section from "./Section";
import recommend from "/public/assets/essentials/0.jpeg";
import hotel from "/public/assets/essentials/1.png";
import rest from "/public/assets/essentials/2.png";
import event from "/public/assets/essentials/3.png";
import { type StaticImageData } from "next/image";
import { api } from "~/utils/api";

// {
//     imagePaths.map((path, index) => (
//         <img key={index} src={`https://cdn.jsdelivr.net/gh/your_github_username/your_repository_name@latest/${path}`} alt={`Image ${index}`} />
//     ))
// }

// function importAll(r) {
//     const images = {};
//     r.keys().map((item, index) => {
//       images[item.replace("./", "")] = r(item);
//     });
//     return images;
//   }

const SiteHero = ({
  site,
}: {
  site: {
    name: string;
    images: StaticImageData[];
    description: string;
    location: {
      lat: number;
      lng: number;
    };
  };
}) => {
  return (
    <section id="SiteHero">
      <header className="mb-[3.3854vw] mt-[11.71875vw] grid place-items-center">
        <h1 className="title text-newBlack">{site.name}</h1>
      </header>
      <section id="Carousel" className="grid grid-cols-4 gap-[1.14vw]">
        {/* {
                site.images.map(picture => {
                    if (picture.index === 0) {
                        return <img src={picture} alt="Photos" className="row-span-2 col-span-2 image" />
                    }
                else {
                        return <img src={picture} alt="Photos" className="aspect-[1.09] image" />
                    }
                }
                )} */}
      </section>
      <section id="Site-Details" className="mt-[7.86vw]">
        <div className="flex items-center">
          <h2 className="semi-title">Site Description</h2>
          <svg
            className="my-auto ml-[24.544vw] mt-[0.26vw] w-[2.669vw]"
            viewBox="0 0 41 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.6405 3.34218C35.4963 1.19797 32.6577 0.026043 29.628 0.026043C26.5984 0.026043 23.751 1.20666 21.6069 3.35086L20.487 4.4707L19.3498 3.33349C17.2056 1.18929 14.3496 0 11.32 0C8.29901 0 5.45167 1.18061 3.31616 3.31613C1.17197 5.46033 -0.00863339 8.30769 4.75343e-05 11.3374C4.75343e-05 14.367 1.18933 17.2057 3.33352 19.3499L19.6363 35.6528C19.862 35.8785 20.1658 36 20.461 36C20.7561 36 21.06 35.8871 21.2857 35.6614L37.6232 19.3846C39.7673 17.2404 40.9479 14.3931 40.9479 11.3634C40.9566 8.33374 39.7847 5.48638 37.6405 3.34218ZM35.9738 17.7266L20.461 33.1787L4.9829 17.7005C3.28144 15.999 2.3439 13.742 2.3439 11.3374C2.3439 8.93272 3.27275 6.67567 4.97421 4.98288C6.66699 3.29009 8.92403 2.35254 11.32 2.35254C13.7246 2.35254 15.9903 3.29009 17.6918 4.99156L19.6537 6.95346C20.1137 7.41355 20.8516 7.41355 21.3117 6.95346L23.2562 5.00892C24.9577 3.30745 27.2234 2.36991 29.6193 2.36991C32.0153 2.36991 34.2723 3.30745 35.9738 5.00024C37.6752 6.70171 38.6041 8.95877 38.6041 11.3634C38.6128 13.768 37.6752 16.0251 35.9738 17.7266Z"
              fill="#484848"
            />
          </svg>
          <svg
            className="my-auto ml-[2.34375vw] mt-[0.26vw] w-[2.408vw]"
            viewBox="0 0 37 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.7914 12.8001C32.903 12.8001 35.4255 10.3824 35.4255 7.40006C35.4255 4.41769 32.903 2 29.7914 2C26.6797 2 24.1572 4.41769 24.1572 7.40006C24.1572 10.3824 26.6797 12.8001 29.7914 12.8001Z"
              stroke="#484848"
              stroke-width="2.60336"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.25427 25.3997C10.3659 25.3997 12.8884 22.982 12.8884 19.9997C12.8884 17.0173 10.3659 14.5996 7.25427 14.5996C4.14261 14.5996 1.62012 17.0173 1.62012 19.9997C1.62012 22.982 4.14261 25.3997 7.25427 25.3997Z"
              stroke="#484848"
              stroke-width="2.60336"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M29.7914 37.9998C32.903 37.9998 35.4255 35.5821 35.4255 32.5998C35.4255 29.6174 32.903 27.1997 29.7914 27.1997C26.6797 27.1997 24.1572 29.6174 24.1572 32.5998C24.1572 35.5821 26.6797 37.9998 29.7914 37.9998Z"
              stroke="#484848"
              stroke-width="2.60336"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.1182 22.7188L24.9453 29.8828"
              stroke="#484848"
              stroke-width="2.60336"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M24.9255 10.1187L12.1172 17.2827"
              stroke="#484848"
              stroke-width="2.60336"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            className="my-auto ml-[11.0677vw] mt-[0.26vw] w-[2.083vw]"
            viewBox="0 0 32 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.5655 0V4.90909H31.4629V8.18182H26.5655V13.0909H23.3006V8.18182H18.4033V4.90909H23.3006V0H26.5655ZM13.5059 19.6364C15.3016 19.6364 16.7708 18.1636 16.7708 16.3636C16.7708 14.5636 15.3016 13.0909 13.5059 13.0909C11.7102 13.0909 10.241 14.5636 10.241 16.3636C10.241 18.1636 11.7102 19.6364 13.5059 19.6364ZM16.7708 3.68182V9.81818H21.6682V14.7273H26.4349C26.5166 15.3655 26.5655 16.02 26.5655 16.6909C26.5655 22.1236 22.2069 28.5545 13.5059 36C4.80494 28.5545 0.446289 22.1236 0.446289 16.6909C0.446289 8.54182 6.64961 3.27273 13.5059 3.27273C14.616 3.27273 15.7097 3.40364 16.7708 3.68182Z"
              fill="#484848"
            />
          </svg>
          <h2 className="semi-title ml-[2.34375vw]">Add to itinerary</h2>
        </div>
        <div id="about" className="mt-[3.385vw] flex">
          <p className="paragraph w-[51.692vw]">{site.description}</p>
          <div
            id="info"
            className="ml-[10.5vw] aspect-[0.8286] w-[24.847vw] gap-[3.896vh] rounded-[0.65vw] bg-mediumGrey px-[1.951vw] shadow-lg"
          >
            <h3 className="mt-[2.604vw] grid place-items-center text-[1.432vw] font-bold text-newBlack">
              Site Info
            </h3>
            <hr className=" mt-[1.5625vw] w-[20.9vw] border-[1px] border-solid bg-[#E0E2E6] "></hr>
            <div id="geo-position" className="mt-[2.34375vw] flex items-center">
              <svg
                className="ml-[0.911vw] w-[1.106vw] "
                viewBox="0 0 17 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.15533 0C3.6466 0 0 3.756 0 8.4C0 10.488 0.582523 12.444 1.64272 14.208C2.74951 16.056 4.20582 17.64 5.32426 19.488C5.87183 20.388 6.26795 21.228 6.68737 22.2C6.99028 22.86 7.23494 24 8.15533 24C9.07571 24 9.32037 22.86 9.61164 22.2C10.0427 21.228 10.4272 20.388 10.9747 19.488C12.0932 17.652 13.5495 16.068 14.6563 14.208C15.7281 12.444 16.3107 10.488 16.3107 8.4C16.3107 3.756 12.6641 0 8.15533 0ZM8.15533 11.7C6.54756 11.7 5.24271 10.356 5.24271 8.7C5.24271 7.044 6.54756 5.7 8.15533 5.7C9.76309 5.7 11.0679 7.044 11.0679 8.7C11.0679 10.356 9.76309 11.7 8.15533 11.7Z"
                  fill="black"
                />
              </svg>
              <p className="detail ml-[1.281vw]">P85P+Q6W, Oran</p>
            </div>
            <div id="hours" className="mt-[2.083vw] flex items-center">
              <svg
                className="ml-[0.651vw] w-[1.5625vw]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9931 0C5.36932 0 0 5.3724 0 12C0 18.6276 5.36932 24 11.9931 24C18.6169 24 23.9863 18.6276 23.9863 12C23.9863 5.3724 18.6169 0 11.9931 0ZM15.9425 17.6484L10.7938 12.4968V4.8H13.1924V11.5032L17.6383 15.9516L15.9425 17.6484Z"
                  fill="black"
                />
              </svg>
              <p className="detail ml-[1.042vw]">Visite hours: 8AM - 7PM</p>
            </div>
            <div id="price" className="mt-[2.083vw] flex items-center">
              <svg
                className=" ml-[0.976vw] w-[0.911vw]"
                viewBox="0 0 14 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.30248 10.5333C4.27755 9.74667 3.30477 8.93333 3.30477 7.66667C3.30477 6.21333 4.65067 5.2 6.90271 5.2C9.27469 5.2 10.1542 6.33333 10.2341 8H13.1791C13.0858 5.70667 11.6866 3.6 8.90157 2.92V0H4.90386V2.88C2.31867 3.44 0.239862 5.12 0.239862 7.69333C0.239862 10.7733 2.78507 12.3067 6.50294 13.2C9.83436 14 10.5006 15.1733 10.5006 16.4133C10.5006 17.3333 9.84769 18.8 6.90271 18.8C4.15762 18.8 3.07824 17.5733 2.93165 16H0C0.159908 18.92 2.34532 20.56 4.90386 21.1067V24H8.90157V21.1333C11.5001 20.64 13.5656 19.1333 13.5656 16.4C13.5656 12.6133 10.3274 11.32 7.30248 10.5333Z"
                  fill="black"
                />
              </svg>
              <p className="detail ml-[1.395vw]">Price: DZD 200</p>
            </div>
            <button className="detail mt-[2.34375vw] aspect-[5.316] w-[20.9vw] rounded-[1.953vw] bg-newBlack text-center font-bold text-white">
              Learn more
            </button>
            <div className="mt-[2.083vw] grid place-items-center">
              <button id="call" className="flex items-center">
                <svg
                  className="w-[1.171875vw]"
                  viewBox="0 0 15 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.83353 5.45133C1.57418 3.74316 2.77859 2.2088 4.61848 1.64666C4.94498 1.54683 5.29727 1.57525 5.60355 1.72612C5.90983 1.87699 6.14706 2.13895 6.26692 2.45865L6.85758 4.03374C6.95267 4.28713 6.96986 4.56316 6.90696 4.82639C6.84405 5.08962 6.70392 5.32805 6.50454 5.51107L4.74748 7.12011C4.66087 7.19959 4.59633 7.30015 4.56016 7.412C4.52399 7.52384 4.51742 7.64315 4.54108 7.7583L4.55738 7.8289L4.59947 8.00542C4.81799 8.8631 5.15093 9.68746 5.58935 10.4563C6.06692 11.2733 6.65959 12.0174 7.34912 12.6655L7.40344 12.7144C7.49116 12.7923 7.59755 12.8461 7.71225 12.8706C7.82695 12.8951 7.94604 12.8895 8.05792 12.8543L10.3296 12.1387C10.5878 12.0576 10.8643 12.0556 11.1236 12.1327C11.383 12.2099 11.6134 12.3628 11.7852 12.5718L12.8606 13.8767C13.3087 14.4199 13.2544 15.2183 12.7398 15.6976C11.3317 17.0106 9.39541 17.2795 8.04842 16.1973C6.39731 14.8654 5.00541 13.2411 3.94227 11.4055C2.87051 9.5712 2.15461 7.55113 1.83217 5.45133H1.83353ZM5.96547 7.84791L7.42109 6.5118C7.82008 6.14591 8.1006 5.66913 8.22666 5.14265C8.35271 4.61618 8.31854 4.06405 8.12853 3.55714L7.53922 1.98204C7.29799 1.33876 6.82056 0.811669 6.2042 0.508162C5.58785 0.204656 4.87896 0.147579 4.22199 0.348563C1.93672 1.04785 0.102264 3.09683 0.49061 5.65636C0.762181 7.44328 1.38815 9.7163 2.76909 12.0898C3.91608 14.0691 5.41752 15.8205 7.1984 17.2564C9.21889 18.879 11.9156 18.325 13.6672 16.6929C14.7073 15.7234 14.8132 14.113 13.9103 13.0159L12.8348 11.7096C12.4908 11.292 12.0299 10.9868 11.5112 10.8329C10.9925 10.679 10.4397 10.6836 9.92361 10.846L8.03755 11.4394C7.55059 10.9373 7.12404 10.38 6.7666 9.77876C6.42133 9.17094 6.15226 8.52289 5.96547 7.84927V7.84791Z"
                    fill="#484848"
                  />
                </svg>
                <p className="ml-[0.78125vw] text-[0.9765vw] font-semibold leading-[1.171vw] text-newBlack">
                  Contact Host
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

const Site = () => {
  const [site, setSite] = useState(null);
  const listRecommend = [
    { name: "Sacred Heart Cathedral", location: "Oran, Oran province" },
    { name: "Sacred Heart Cathedral", location: "Oran, Oran province" },
    { name: "Sacred Heart Cathedral", location: "Oran, Oran province" },
    { name: "Sacred Heart Cathedral", location: "Oran, Oran province" },
    { name: "Sacred Heart Cathedral", location: "Oran, Oran province" },
    { name: "Sacred Heart Cathedral", location: "Oran, Oran province" },
  ];
  const listHotels = [
    { name: "Four Points", location: "Oran, Oran province" },
    { name: "Four Points", location: "Oran, Oran province" },
    { name: "Four Points", location: "Oran, Oran province" },
    { name: "Four Points", location: "Oran, Oran province" },
    { name: "Four Points", location: "Oran, Oran province" },
    { name: "Four Points", location: "Oran, Oran province" },
    { name: "Four Points", location: "Oran, Oran province" },
  ];
  const listRest = [
    { name: "Grillade Le TRIO 🍖", location: "Oran, Oran province" },
    { name: "Grillade Le TRIO 🍖", location: "Oran, Oran province" },
    { name: "Grillade Le TRIO 🍖", location: "Oran, Oran province" },
    { name: "Grillade Le TRIO 🍖", location: "Oran, Oran province" },
    { name: "Grillade Le TRIO 🍖", location: "Oran, Oran province" },
    { name: "Grillade Le TRIO 🍖", location: "Oran, Oran province" },
  ];
  const listEvents = [
    { name: "SECURA North Africa", location: "Algiers, 11.22. - 11.24.2022" },
    { name: "SECURA North Africa", location: "Algiers, 11.22. - 11.24.2022" },
    { name: "SECURA North Africa", location: "Algiers, 11.22. - 11.24.2022" },
    { name: "SECURA North Africa", location: "Algiers, 11.22. - 11.24.2022" },
    { name: "SECURA North Africa", location: "Algiers, 11.22. - 11.24.2022" },
    { name: "SECURA North Africa", location: "Algiers, 11.22. - 11.24.2022" },
  ];
  /*
<SiteHero site={site} />
          <section id="Map" className="z-0 mt-[7.86vw] ">
            <h2 className="semi-title">Near {site.name}</h2>
            <Map position={site.position}></Map>
          </section>
*/

  return (
    <main className="mx-auto w-[87.1vw]">
      {site === null ? null : (
        <>
          <Section
            section="Our Recommendations"
            list={listRecommend}
            img={recommend}
          />
          <Section section="Hotels" list={listHotels} img={hotel} />
          <Section section="Restaurants" list={listRest} img={rest} />
          <Section
            section="Happening Right Now"
            list={listEvents}
            img={event}
          />
        </>
      )}
    </main>
  );
};

export default Site;
