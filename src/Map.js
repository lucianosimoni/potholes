import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import mapStyles from "./mapStyles";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};
const center = {
  lat: 51.507351,
  lng: -0.127758,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

function Map() {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/holes")
      .then((res) => res.json())
      .then((data) => setMarkers(data))
      .catch((err) => {
        console.error("Error while fetching Holes from api: ", err);
      });
  }, []);

  // Google kinda of api auth
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyARRJH9A9HwbSQ9j2jgBOB93IoWqvbKtpI",
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
      options={options}
    >
      {markers.map((marker) => {
        return <Marker key={marker.id} position={marker.position} />;
      })}
    </GoogleMap>
  );
}

export default Map;
