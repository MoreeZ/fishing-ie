import React, { useContext, useEffect, useState, useMemo } from "react";
import { locationsReducer } from "../../../reducers/locationsReducer";
import GoogleMaps from "./DisplayMap";
import { authReducer } from "../../../reducers/authReducer";
// import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";

const LocationPage = props => {
  useEffect(() => window.scrollTo(0, 0), []);
  const { locations, images } = useContext(locationsReducer).state;
  const { uid, permissions } = useContext(authReducer).state;
  const [info, setInfo] = useState({
    name: "",
    longdesc: "",
    coordinates: {
      lat: 0,
      lng: 0
    },
    facilities: [],
    fish: [],
    madeBy: "",
    madeOn: null,
    madeByUID: ""
  });
  const [imageURL, setImageURL] = useState("");
  const locationID = props.match.params.location_id;
  const myDate = new Date(info.madeOn);

  const findLocationAndMapToState = () => {
    const currLocation = locations[locationID];
    if (currLocation) {
      setInfo(currLocation);
      if (images.length > 0) {
        const myImage = images.find(img => img.fileName === currLocation.image);
        if (myImage) {
          setImageURL(myImage.url);
        }
      }
    }
  };

  useMemo(findLocationAndMapToState, [locations, images, locationID]);

  const renderPage = () => (
    <div className="each-location-page each-page-layout">
      <div className="responsive-cont column-cont">
        <div className="left-column">
          <div className="locaiton-top-block">
            <div className="locaiton-name">{info.name}</div>
            <div className="location-description">{info.longdesc}</div>
            <div className="divider" />
            <div className="nearby-facilities">Fish you can catch:</div>
            <ul className="facilities-list">
              {info.fish.map(f => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="divider" />
            <div className="nearby-facilities">Nearby Facilities:</div>
            <ul className="facilities-list">
              {info.facilities.map(f => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="divider" />
            <div className="location-bottom-left">
              {info.madeBy && (
                <div className="made-by">
                  Added by: <span>{info.madeBy}</span>
                </div>
              )}
              {info.madeOn && (
                <div className="made-by made-on">
                  Added on:{" "}
                  <span>
                    {myDate.getDate().toString() +
                      " / " +
                      myDate.getMonth().toString() +
                      " / " +
                      myDate.getFullYear().toString()}
                  </span>
                </div>
              )}
              {(uid === info.madeByUID || permissions === "admin") && (
                <DeleteButton locationID={locationID} />
              )}
            </div>
          </div>
        </div>
        <div className="right-column">
          <img src={imageURL} alt="" />
          <div className="location-map">
            {info.coordinates.lat !== 0 && info.coordinates.lat !== 0 && (
              <GoogleMaps coordinates={info.coordinates} />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return useMemo(renderPage, [info, imageURL, uid, permissions]);
};

export default LocationPage;
