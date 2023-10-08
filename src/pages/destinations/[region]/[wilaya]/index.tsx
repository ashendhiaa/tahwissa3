import React, { useState, useCallback, useEffect } from "react";
import {
  SectionPlaces,
  SectionHotels,
  SectionRestaurants,
} from "~/components/Section";
import { useSelector } from "react-redux";
import { selectRegionsState, getAllRegions } from "~/store/regionsReducer";
import { selectWilayasState, getRegionWilayas } from "~/store/wilayasReducer";
import { useAppDispatch } from "~/hooks";
import { useRouter } from "next/router";
import Map from "~/components/Map";

import * as d3 from "d3";
import { api } from "~/utils/api";
import Wilayas from "~/components/Wilayas";
import { RegionWithWilayas, WilayaWithSites } from "~/types";

const fetchDestination = async (name: string) => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${name}.json?country=dz&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
  );
  const data = await response.json();
  return data;
};

const Description = ({
  wilaya,
  regionId,
  wilayas,
}: {
  wilaya: WilayaWithSites;
  regionId: number;
  wilayas: WilayaWithSites[];
}) => {
  const [description, setDescription] = useState<any[]>([]);

  const breakLine = (text: string) => {
    const words = text.split("\\r\\n");
    return words.map((word, index) => {
      return (
        <span key={index}>
          {word}
          <br />
        </span>
      );
    });
  };

  const distance = async ({
    origin,
    arrival,
  }: {
    origin: string;
    arrival: string;
  }) => {
    const originResponse = await fetchDestination(origin);
    const arrivalResponse = await fetchDestination(arrival);

    const originCoordinates = originResponse.features[0].center;
    const arrivalCoordinates = arrivalResponse.features[0].center;

    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoordinates[0]}%2C${originCoordinates[1]}%3B${arrivalCoordinates[0]}%2C${arrivalCoordinates[1]}?alternatives=false&geometries=geojson&overview=full&steps=false&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );
    return response.json();
  };

  const getDistances = async () => {
    const capital = wilaya;
    const specialWilayas = wilayas.filter((wilaya) => wilaya.special === true);

    const destinations = specialWilayas.map(async (wilaya, index) => {
      const wilayaResponse = await distance({
        origin: capital.name,
        arrival: wilaya.name,
      });
      return {
        distance: wilayaResponse.routes[0].distance / 1000,
        from: wilaya.name,
      };
    });

    const destinationsPromise = await Promise.all(destinations);

    const destinationsResponse = destinationsPromise.filter((destination) => {
      return destination.distance !== 0;
    });

    return destinationsResponse;
  };

  const calculateZoneCenterX = (zonePath: SVGPathElement) => {
    const bbox = zonePath.getBBox();
    return bbox.x + bbox.width / 2;
  };

  const calculateZoneCenterY = (zonePath: SVGPathElement) => {
    const bbox = zonePath.getBBox();
    return bbox.y + bbox.height / 2;
  };

  const findCircles = (
    from: [number, number],
    to: [number, number],
    n: number
  ) => {
    let i = from[0];
    let a = from[1];
    let u = to[0];
    let l = to[1];
    let c = u - i;
    let f = l - a;
    let d = Math.sqrt(c * c + f * f);
    let p = (i + u) / 2;
    let h = (a + l) / 2;
    let v = Math.sqrt(n * n - (d / 2) * (d / 2));
    return [
      {
        x: p - (v * f) / d,
        y: h + (v * c) / d,
      },
      {
        x: p + (v * f) / d,
        y: h - (v * c) / d,
      },
    ];
  };

  const polarToCartesian = (e: number, t: number, n: number, r: number) => {
    let o = ((r - 90) * Math.PI) / 180;
    return {
      x: e + n * Math.cos(o),
      y: t + n * Math.sin(o),
    };
  };

  const angle = (e: number, t: number, n: number, r: number) => {
    return n >= e && r <= t
      ? (180 * Math.atan(Math.abs(e - n) / Math.abs(t - r))) / Math.PI
      : n >= e
      ? 180 - (180 * Math.atan(Math.abs(e - n) / Math.abs(t - r))) / Math.PI
      : r >= t
      ? 180 + (180 * Math.atan(Math.abs(e - n) / Math.abs(t - r))) / Math.PI
      : 360 - (180 * Math.atan(Math.abs(e - n) / Math.abs(t - r))) / Math.PI;
  };

  const arc = (e: number, t: number, n: number, r: number, o: number) => {
    let i = polarToCartesian(e, t, n, o);
    let a = polarToCartesian(e, t, n, r);
    let s = o - r <= 180 ? "0" : "1";
    return ["M", i.x, i.y, "A", n, n, 0, s, 0, a.x, a.y].join(" ");
  };

  let regionRef = useCallback(
    (node: SVGSVGElement) => {
      if (node !== null) {
        const wilayaPath = document.getElementById(
          `${wilaya.id}`
        ) as unknown as SVGPathElement;
        wilayaPath!.classList.add("redZone");

        let wilayaX = calculateZoneCenterX(wilayaPath);
        let wilayaY = calculateZoneCenterY(wilayaPath);

        const specialWilayas = wilayas
          .filter((city) => city.special === true && city.id !== wilaya.id)
          .map((wilaya) => {
            const wilayaPath = document.getElementById(
              `${wilaya.id}`
            ) as unknown as SVGPathElement;
            return wilayaPath;
          });

        const paths = specialWilayas.map((wilayaPath) => {
          const regionX = calculateZoneCenterX(wilayaPath);
          const regionY = calculateZoneCenterY(wilayaPath);
          return {
            x: regionX,
            y: regionY,
          };
        });

        const svg = d3.select("#svg2");

        svg
          .append("circle")
          .attr("cx", wilayaX)
          .attr("cy", wilayaY)
          .attr("r", 6)
          .attr("id", "circle0")
          .classed("center", true)
          .raise();

        paths.forEach((path, key) => {
          const destinationGroup = svg
            .append("g")
            .attr("id", `group${key}`)
            .attr("class", "mapDestination")
            .raise();

          destinationGroup
            .append("circle")
            .attr("cx", path.x)
            .attr("cy", path.y)
            .attr("r", "5")
            .attr("id", `circle${key}`)
            .classed("blackDot", true)
            .raise();

          let u = Math.abs(path.x - wilayaX);
          let l = Math.abs(path.y - wilayaY);
          let c = Math.sqrt(u * u + l * l) / 1.75;
          let f = findCircles([path.x, path.y], [wilayaX, wilayaY], c)[0];
          let p = angle(f!.x, f!.y, path.x, path.y);
          let h = angle(f!.x, f!.y, wilayaX, wilayaY);
          let v = (h - p + 360) % 360;
          let m = v < 180 ? p : h;
          let g = v < 180 ? h : p;
          let d = arc(f!.x, f!.y, c, m, g);

          destinationGroup.append("path").attr("d", d).classed("line2", true);
        });

        document.querySelectorAll(".mapDestination").forEach((el) => {
          el.addEventListener("mouseenter", function () {
            el.classList.add("lineAnimation2");
            document.querySelectorAll(".mapDestination").forEach((path) => {
              if (path !== el) {
                path.classList.add("lineInactive");
              }
            });
          });
          el.addEventListener("mouseout", function () {
            el.classList.remove("lineAnimation2");
            document.querySelectorAll(".mapDestination").forEach((path) => {
              if (path !== el) {
                path.classList.remove("lineInactive");
              }
            });
          });
        });
      }
    },
    [description]
  );

  const [weather, setWeather] = useState({} as any);

  useEffect(() => {
    if (document.getElementById("region") !== null) {
      const fetchDescription = async () => {
        const distances = await getDistances();
        setDescription(distances);
      };
      fetchDescription();
    }
  }, [wilaya]);

  useEffect(() => {
    const fetching = async () => {
      const response = await fetch(
        `https://ik.imagekit.io/vaqzdpz5y/assets/images/${regionId}/2.svg`
      );

      const weather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          wilaya!.name
        }&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      setWeather(await weather.json());

      const svgContent = await response.text();
      document.getElementById("region")!.innerHTML = svgContent;
      document.getElementById("svg2")!.classList.add("svg");

      regionRef(document.getElementById("svg2") as unknown as SVGSVGElement);
    };
    fetching();
  }, [description]);

  const windState = (windSpeed: number) => {
    const windSpeedMph = windSpeed * 2.237; // Convert wind speed from m/s to mph

    let category = "";
    switch (true) {
      case windSpeedMph >= 0 && windSpeedMph <= 1:
        category = "Calm";
        break;
      case windSpeedMph > 1 && windSpeedMph <= 3:
        category = "Light air";
        break;
      case windSpeedMph > 3 && windSpeedMph <= 7:
        category = "Light breeze";
        break;
      case windSpeedMph > 7 && windSpeedMph <= 12:
        category = "Gentle breeze";
        break;
      case windSpeedMph > 12 && windSpeedMph <= 18:
        category = "Moderate breeze";
        break;
      case windSpeedMph > 18 && windSpeedMph <= 24:
        category = "Fresh breeze";
        break;
      case windSpeedMph > 24 && windSpeedMph <= 31:
        category = "Strong breeze";
        break;
      case windSpeedMph > 31 && windSpeedMph <= 38:
        category = "Near gale";
        break;
      case windSpeedMph > 38 && windSpeedMph <= 46:
        category = "Gale";
        break;
      case windSpeedMph > 46 && windSpeedMph <= 54:
        category = "Strong gale";
        break;
      case windSpeedMph > 54 && windSpeedMph <= 63:
        category = "Storm";
        break;
      case windSpeedMph > 63 && windSpeedMph <= 73:
        category = "Violent storm";
        break;
      case windSpeedMph > 73:
        category = "Hurricane";
        break;
      default:
        category = "Unknown";
        break;
    }

    return category;
  };

  return (
    <section id="region-description" className="row justify-between">
      <div className="col w-[64.12760416666666vw] gap-[2.864583333333333vw]">
        <div className="description">
          <h2 className="semi-title">Description</h2>
          <p className="paragraph">{breakLine(wilaya!.description)}</p>
        </div>
        <div className="col gap-[2.864583333333333vw]">
          <h2 className="semi-title">Weather</h2>
          <p className="paragraph">{breakLine(wilaya!.weather)}</p>
        </div>
        <div className="col gap-[2.864583333333333vw]">
          <h2 className="semi-title">Transportation</h2>
          <p className="paragraph">{breakLine(wilaya!.transportation)}</p>
        </div>
      </div>
      <div className="col h-2 gap-[1.8880208333333333vw]">
        <div className=" col w-[20.377604166666664vw] gap-[0.8463541666666666vw] rounded-[0.78125vw] border-2 border-newBlack bg-[rgba(214,224,224,0.15)] py-[5.6vw]">
          <div id="region"></div>
          <p className=" mx-auto text-[1.2369791666666665vw] leading-[3.90625vw] text-newBlack ">
            {description &&
              description.map((destination, key) => {
                return (
                  <span key={key}>
                    <b>{Math.round(destination.distance)} km</b> from{" "}
                    {destination.from}
                    <br />
                  </span>
                );
              })}
          </p>
        </div>
        <div className="col w-[20.377604166666664vw] gap-[0.8463541666666666vw] rounded-[0.78125vw] border-2 border-newBlack bg-[rgba(214,224,224,0.15)] py-[1.8vw] pl-[1.6927083333333333vw]">
          <h2 className="text-[1.953125vw] font-bold text-newBlack">Today</h2>
          <div className="row items-center gap-[5vw]">
            {weather && weather.weather && weather.main && (
              <>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                />
                <p className="text-[2.9296875vw] font-bold text-newBlack">
                  {(weather.main.temp - 273.15).toFixed(0)}°
                </p>
              </>
            )}
          </div>
          {weather && weather.weather && (
            <p className="text-[1.1067708333333335vw] text-newBlack">
              {weather.weather[0].description.charAt(0).toUpperCase() +
                weather.weather[0].description.slice(1)}
              . {windState(weather.wind.speed)}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

const Main = ({
  wilaya,
  wilayas,
  region,
  wilayaCoords,
}: {
  wilaya: WilayaWithSites;
  wilayas: WilayaWithSites[];
  region: RegionWithWilayas;
  wilayaCoords: [number, number];
}) => {
  const top = api.sites.getTopByWilaya.useQuery({
    wilayaId: wilaya.id,
  }).data;

  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let hotelsResults = [];
        let restaurantsResults = [];
        let response = await fetch(
          `https://bitter-surf-8047.fly.dev/https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=hotel&location=${wilayaCoords[1]}%2C${wilayaCoords[0]}&radius=40000&type=hotel&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
        );
        let hotelsRes = await response.json();
        hotelsResults.push(...hotelsRes.results);
        while (hotelsRes.next_page_token) {
          response = await fetch(
            `https://bitter-surf-8047.fly.dev/https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${hotelsRes.next_page_token}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
          );
          hotelsRes = await response.json();
          hotelsResults.push(...hotelsRes.results);
        }

        // filter the results to get hotels with rating > 3
        hotelsResults = hotelsResults.filter((hotel: any) => hotel.rating >= 4);

        // sort the results by rating/number of reviews and get the top 6
        hotelsResults.sort((a: any, b: any) => {
          return (
            b.rating * b.user_ratings_total - a.rating * a.user_ratings_total
          );
        });
        hotelsResults = hotelsResults.slice(0, 6);

        // use the trip advisor api to find the hotels with their images

        hotelsResults.map(async (hotel: any) => {
          try {
            let response = await fetch(
              `https://bitter-surf-8047.fly.dev/https://api.content.tripadvisor.com/api/v1/location/search?key=${process.env.NEXT_PUBLIC_TRIPADVISOR_API_KEY}&searchQuery=${hotel.name}&latLong=${hotel.geometry.location.lat}%2C${hotel.geometry.location.lng}&radius=3&radiusUnit=km`
            );

            let location = await response.json();

            response = await fetch(
              `https://bitter-surf-8047.fly.dev/https://api.content.tripadvisor.com/api/v1/location/${location[0].location_id}/details?key=${process.env.NEXT_PUBLIC_TRIPADVISOR_API_KEY}`
            );

            let link = await response.json();

            hotel.link = link;
          } catch (error) {
            console.log("Unauthorized Access");
          }
        });

        // get the restaurants

        response = await fetch(
          `https://bitter-surf-8047.fly.dev/https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=restaurant&location=${wilayaCoords[1]}%2C${wilayaCoords[0]}&radius=40000&type=restaurant&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
        );

        let restaurantsRes = await response.json();

        restaurantsResults.push(...restaurantsRes.results);

        while (restaurantsRes.next_page_token) {
          response = await fetch(
            `https://bitter-surf-8047.fly.dev/https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${restaurantsRes.next_page_token}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
          );
          restaurantsRes = await response.json();
          restaurantsResults.push(...restaurantsRes.results);
        }

        // filter the results to get restaurants with rating > 3

        restaurantsResults = restaurantsResults.filter(
          (restaurant: any) => restaurant.rating >= 4
        );

        // sort the results by rating/number of reviews and get the top 6

        restaurantsResults.sort((a: any, b: any) => {
          return (
            b.rating * b.user_ratings_total - a.rating * a.user_ratings_total
          );
        });
        restaurantsResults = restaurantsResults.slice(0, 6);

        // use the trip advisor api to find the restaurants with their images

        restaurantsResults.map(async (restaurant: any) => {
          try {
            let response = await fetch(
              `https://bitter-surf-8047.fly.dev/https://api.content.tripadvisor.com/api/v1/location/search?key=${process.env.NEXT_PUBLIC_TRIPADVISOR_API_KEY}&searchQuery=${restaurant.name}&latLong=${restaurant.geometry.location.lat}%2C${restaurant.geometry.location.lng}&radius=3&radiusUnit=km`
            );

            let location = await response.json();

            response = await fetch(
              `https://bitter-surf-8047.fly.dev/https://api.content.tripadvisor.com/api/v1/location/${location[0].location_id}/details?key=${process.env.NEXT_PUBLIC_TRIPADVISOR_API_KEY}`
            );

            let link = await response.json();

            restaurant.link = link;
          } catch (error) {
            console.log("Unauthorized Access");
          }
        });

        setHotels(hotelsResults as any);

        setRestaurants(restaurantsResults as any);

        console.log("done");
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [wilayaCoords]);

  if (!top) {
    return null;
  }

  if (hotels?.length === 0) {
    return null;
  }

  if (restaurants.length === 0) {
    return null;
  }

  return (
    <div className="new-page mx-auto mt-[9vw] w-[87.1vw] gap-[8.919270833333332vw]">
      <Description wilaya={wilaya} regionId={region.id} wilayas={wilayas} />
      <section
        id="Map"
        className="col mt-[0.6510416666666667vw] gap-[3.3854166666666665vw]"
      >
        <h2 className="semi-title">Explore {wilaya.name}</h2>
        <Map center={wilayaCoords} zoom={13} />
      </section>
      <SectionPlaces
        data={top}
        section="Must Sees"
        wilaya={wilaya}
        regionId={region.id}
      />
      <SectionHotels data={hotels} section="Hotels" wilayaName={wilaya.name} />
      <section id="Gastronomy" className="col gap-[2.864583333333333vw]">
        <h2 className="semi-title">Gastronomy</h2>
        <div className="row w-full flex-wrap gap-[1.8229166666666667vw]">
          {Array.isArray(wilaya.food) &&
            wilaya.food.map((food: any, index: number) => {
              return (
                <div
                  key={index}
                  className="row mb-4 w-[42.3828125vw] gap-[1.8229166666666667vw]"
                >
                  <div
                    style={{
                      backgroundImage: `url(${`https://ik.imagekit.io/vaqzdpz5y/assets/images/${
                        region.id
                      }/${wilaya.id}/food${index + 1}.png`})`,
                    }}
                    className="h-[20.833333333333336vw] w-[20.833333333333336vw] flex-none rounded-[0.7161458333333333vw] bg-cover bg-center"
                  />
                  <div className="col items-start gap-[1.5625vw]">
                    <h3 className="text-[1.5625vw] font-bold text-newBlack">
                      {food.name}
                    </h3>
                    <p className="text-[1.0416666666666665vw] leading-[1.953125vw] text-newGrey">
                      {food.description}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      <SectionRestaurants
        data={restaurants}
        section="Restaurants"
        wilayaName={wilaya.name}
      />
      <Wilayas region={region} wilayaId={wilaya.id} />
    </div>
  );
};

const Wilaya = ({
  region,
  wilayaName,
}: {
  region: RegionWithWilayas;
  wilayaName: string;
}) => {
  const dispatch = useAppDispatch();

  dispatch(getRegionWilayas(region!.id));
  const wilayas = useSelector(selectWilayasState);
  const wilaya = wilayas.find((wilaya) => {
    return wilaya.name === wilayaName;
  });

  const [wilayaCoords, setWilayaCoords] = useState<[number, number]>();

  useEffect(() => {
    const fetchCoordinates = async (destination: string) => {
      const wilayaResponse = await fetchDestination(destination);
      const wilayaCoordsResponse = wilayaResponse.features[0].center;
      setWilayaCoords(wilayaCoordsResponse);
    };
    if (wilaya?.name) {
      fetchCoordinates(wilaya!.name);
    }
  }, [wilaya]);

  if (!region) {
    return null;
  }

  if (!wilaya) {
    return null;
  }

  if (!wilayaCoords) {
    return null;
  }

  return (
    <>
      <header
        style={{
          backgroundImage: `url('https://ik.imagekit.io/vaqzdpz5y/assets/images/${
            region!.id
          }/${wilaya!.id}/1.png')`,
        }}
        className="bg-image"
      >
        <div className="absolute left-[10.0911vw] top-[19.46614vw]">
          <h1 className="title text-white">{wilaya!.name}</h1>
          <h2 className="bg-semi-title text-white">{wilaya!.nickname}</h2>
        </div>
      </header>
      <Main
        wilaya={wilaya}
        wilayas={wilayas}
        region={region}
        wilayaCoords={wilayaCoords}
      ></Main>
    </>
  );
};

const FetcherComponent = () => {
  const dispatch = useAppDispatch();
  dispatch(getAllRegions());
  const regions = useSelector(selectRegionsState);

  const { query } = useRouter();

  let { region, wilaya } = query;

  if (typeof region !== "string" || typeof wilaya !== "string") {
    return null;
  }

  const regionPhrase = region.split(" ");
  const wilayaPhrase = wilaya.split(" ");

  const regionCapital = regionPhrase.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const wilayaCapital = wilayaPhrase.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const regionCapitalString = regionCapital.join(" ");

  const regionFetched = regions.find((region: any) => {
    return region.name === regionCapitalString;
  });

  const wilayaCapitalString = wilayaCapital.join(" ");

  if (!regionFetched) {
    return null;
  }

  return (
    <Wilaya region={regionFetched} wilayaName={wilayaCapitalString}></Wilaya>
  );
};

export default FetcherComponent;
