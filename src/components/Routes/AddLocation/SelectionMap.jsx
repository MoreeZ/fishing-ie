import React, { useState, useContext, useMemo } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import { addLocationReducer } from "../../../reducers/addLocationReducer";

const SelectionMap = props => {
  const { state, dispatch } = useContext(addLocationReducer);
  const [position, setPosition] = useState(state.coordinates);

  useMemo(() => {
    dispatch({ type: "UPDATE_COORDINATES", position });
  }, [position, dispatch]);

  const onMarkerDragEnd = event => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    setPosition({
      lat: newLat,
      lng: newLng
    });
  };

  const onPlaceSelected = place => {
    if (place.geometry) {
      const latValue = place.geometry.location.lat();
      const lngValue = place.geometry.location.lng();

      setPosition({
        lat: latValue,
        lng: lngValue
      });
    }
  };

  const AsyncMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        google={props.google}
        defaultZoom={10}
        defaultCenter={state.coordinates}
      >
        {/*Marker*/}
        <Marker
          google={props.google}
          name={"Dolores park"}
          draggable={true}
          onDragEnd={onMarkerDragEnd}
          position={state.coordinates}
        />
        <Marker />
        {/* For Auto complete Search Box */}
        <Autocomplete
          style={{
            width: "100%",
            height: "40px",
            paddingLeft: "16px",
            marginTop: "2px",
            marginBottom: "500px"
          }}
          onPlaceSelected={onPlaceSelected}
          types={["(regions)"]}
        />
      </GoogleMap>
    ))
  );

  const rednerAsyncMap = () => {
    return (
      <AsyncMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGLyz6IY1BvG1t6wvZttmWWTi43XdH2Zc&libraries=places"
        loadingElement={<div style={{ height: `100%`, width: "100%" }} />}
        containerElement={<div style={{ height: "400px", width: "100%" }} />}
        mapElement={<div style={{ height: `100%`, width: "100%" }} />}
      />
    );
  };

  const preventFetches = useMemo(rednerAsyncMap, [state.coordinates]);
  return preventFetches;
};

export default SelectionMap;
