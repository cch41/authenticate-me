import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "./Maps.css";

const Map = ({ locations }) => {
  const [showInfo, setShowInfo] = useState(0);

  //This sets the center of the map. This must be set BEFORE the map loads

  const [presetPos, setPresetPos] = useState({
    lat: 43.11016617798622,
    lng: -89.48826131670266,
  });

  if (locations.length) {
    var locationsPos = {
      lat: locations[0].latitude,
      lng: locations[0].longitude,
    };
  }

  // This is the equivalent to a script tag

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
  });

  const containerStyle = {
    width: "400px",
    height: "600px",
  };

  const [map, setMap] = useState(null);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    // Important! Always set the container height explicitly

    <div className="map_page__container">
      <div style={{ height: "900px", width: "300px" }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={5}
            center={locations.length ? locationsPos : presetPos}
            onUnmount={onUnmount}
          >
            {locations.map((location) => (
              <>
                <Marker
                  onClick={() => setShowInfo(location.id)}
                  key={location.id}
                  position={{ lat: location.latitude, lng: location.longitude }}
                  title={location.name}
                  icon={{
                    path: "M 100 100 L 300 100 L 200 300 z",
                    fillColor: "blue",
                    fillOpacity: 1,
                    scale: 0.1,
                    strokeColor: "gold",
                    strokeWeight: 2,
                  }}
                  streetView={false}
                />
                <InfoWindow
                  position={{ lat: location.latitude, lng: location.longitude }}
                  shouldFocus={false}
                >
                  <div className="map info-container">
                    <img className="map location-pic" src={location.imageUrl} />
                    <div className="map location-info">{location.name}</div>
                  </div>
                </InfoWindow>
              </>
            ))}
          </GoogleMap>
        ) : null}
      </div>
    </div>
  );
};

export default Map;
