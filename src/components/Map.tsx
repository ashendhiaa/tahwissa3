import "leaflet/dist/leaflet.css";
import dynamic from "next/dist/shared/lib/dynamic";

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

export const LazyChangeView = dynamic(
  async () => (await import("./ChangeView")).default,
  {
    ssr: false,
  }
);

const Map = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  return (
    <div className="aspect-[1.9851] w-full">
      <LazyMapContainer
        style={{
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
        center={[center[1], center[0]]}
        zoom={zoom}
        scrollWheelZoom={true}
      >
        <LazyTileLayer
          attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/${process.env.NEXT_PUBLIC_MAPBOX_USERNAME}/${process.env.NEXT_PUBLIC_MAPBOX_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
        />
        <LazyChangeView center={center} zoom={zoom} />
      </LazyMapContainer>
    </div>
  );
};

export default Map;
