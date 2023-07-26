import { useEffect } from "react";
import { useMap } from "react-leaflet";

const ChangeView = ({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) => {
  const map = useMap();
  useEffect(() => {
    map.setView([center[1], center[0]], zoom);
  }, [center]);

  return null;
};

export default ChangeView;
