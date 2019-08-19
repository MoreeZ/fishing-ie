import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const DisplayMap = React.memo(props => {
  const MyMapComponent = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        google={props.google}
        defaultZoom={8}
        defaultCenter={props.coordinates}
      >
        <Marker position={props.coordinates} />
      </GoogleMap>
    ))
  );
  return (
    <MyMapComponent
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGLyz6IY1BvG1t6wvZttmWWTi43XdH2Zc&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
});

export default DisplayMap;
