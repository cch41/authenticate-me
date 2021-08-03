import React, { useState, useCallback, useEffect } from "react";
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
    <div className="map_page__container">
      <div style={{ height: "900px", width: "300px" }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={4}
            center={locations.length ? locationsPos : presetPos}
            onUnmount={onUnmount}
          >
            {locations.map((location) => (
              <>
                <Marker
                  onClick={() => setShowInfo(location)}
                  key={location.id}
                  position={{ lat: location.latitude, lng: location.longitude }}
                  title={location.name}
                  icon={{
                    fillColor: "blue",
                    fillOpacity: 1,
                    scale: 0.1,
                    strokeColor: "gold",
                    strokeWeight: 2,
                  }}
                  streetView={false}
                />
                {showInfo && (
                  <InfoWindow
                    position={{
                      lat: showInfo.latitude + 0.1,
                      lng: showInfo.longitude,
                    }}
                    shouldFocus={false}
                    onCloseClick={() => setShowInfo(0)}
                  >
                    <div className="map info-container">
                      <img
                        className="map location-pic"
                        src={showInfo.imageUrl}
                      />
                      <div className="map location-info">{showInfo.name}</div>
                    </div>
                  </InfoWindow>
                )}
              </>
            ))}
          </GoogleMap>
        ) : null}
      </div>
    </div>
  );
};

export default Map;
