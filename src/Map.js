import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import mapStyles from "./mapStyles";
import PotholeMarker from "../src/marker.svg";
import SelectionMarker from "../src/markerSelection.svg";
import "./Map.css";

const center = {
  lat: 51.507351,
  lng: -0.127758,
};

function Map({ darkMode, mapClick, setMapClick }) {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectionMarker, setSelectionMarker] = useState({
    lat: null,
    lng: null,
  });

  // Map config
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };
  const options = {
    styles: darkMode ? mapStyles.dark : mapStyles.light,
    disableDefaultUI: true,
    zoomControl: true,
  };

  // Handle Map click
  const mapClicked = (event) => {
    if (mapClick.active) {
      // setSelectionMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      setMapClick({
        active: true,
        location: { lat: event.latLng.lat(), lng: event.latLng.lng() },
      });
    }
  };

  // Removes selectionPosition if addForm not showing
  // useEffect(() => {
  //   setSelectionMarker({ lat: null, lng: null });
  // }, [mapClick]);

  // Fetch Holes from DB
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
      clickableIcons={false}
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
      options={options}
      onClick={(event) => mapClicked(event)}
    >
      {/* Mapping of Database */}
      {markers.map((marker) => {
        return (
          <Marker
            key={marker.id}
            position={marker.position}
            options={{ icon: PotholeMarker }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        );
      })}

      {/* Selection Marker */}
      {mapClick.active === true && mapClick.location.lat !== null ? (
        <Marker
          position={mapClick.location}
          options={{ icon: SelectionMarker }}
          clickable={false}
        />
      ) : null}

      {/* Info Box */}
      {selected && (
        <InfoWindow
          position={selected.position}
          onCloseClick={() => setSelected(null)}
        >
          <div className="info-window">
            <h3 className="info-title">{selected.title}</h3>
            <p className="info-description">{selected.description}</p>
            <span className="info-author">Author: {selected.authorId}</span>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default Map;
