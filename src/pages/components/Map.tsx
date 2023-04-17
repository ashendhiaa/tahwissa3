import { MapContainer, TileLayer } from "react-leaflet";

const Map = ({
  position,
}: {
  position: {
    lat: number;
    log: number;
  };
}) => {
  return (
    <div className="mt-[3.385vw] aspect-[1.9851] w-full">
      <MapContainer
        style={{ width: "100%", height: "100%", zIndex: 0 }}
        center={[position.lat, position.log]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/${process.env.MAPBOX_USERNAME}/${process.env.MAPBOX_STYLE_ID}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
