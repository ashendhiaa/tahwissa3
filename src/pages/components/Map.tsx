import dynamic from "next/dynamic";

export const LazyMapContainer = dynamic(
  async () => (await import("react-leaflet")).MapContainer,
  {
    ssr: false,
  }
);

export const LazyTileLayer = dynamic(
  async () => (await import("react-leaflet")).TileLayer,
  {
    ssr: false,
  }
);

const Map = ({ center }: { center: [number, number] }) => {
  return (
    <div className="mt-[3.385vw] aspect-[1.9851] w-full">
      <LazyMapContainer
        style={{ width: "100%", height: "100%", zIndex: 0 }}
        center={center}
        zoom={13}
        scrollWheelZoom={true}
      >
        <LazyTileLayer
          attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/${process.env.MAPBOX_USERNAME}/${process.env.MAPBOX_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`}
        />
      </LazyMapContainer>
    </div>
  );
};

export default Map;
