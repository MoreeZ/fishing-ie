import React, { useEffect, useContext, useState, useMemo } from "react";
import { Link } from "react-router-dom";
// import Xbutton from "../../assets/Xbutton.svg";
import { authReducer } from "../../../reducers/authReducer";
import { locationsReducer } from "../../../reducers/locationsReducer";
import DeleteConfirmation from "./DeleteConfirmation";

const YourLocations = () => {
  const { userLocations, uid } = useContext(authReducer).state;
  const { state, dispatch } = useContext(locationsReducer);
  const [openedModal, setOpenedModal] = useState([]);
  useEffect(() => window.scrollTo(0, 0), []);
  useMemo(() => {
    setOpenedModal(userLocations.map(id => ({ [id]: false })));
  }, [userLocations]);

  const openModal = locationID => {
    setOpenedModal({ ...openedModal, [locationID]: true });
  };
  const closeModal = locationID => {
    setOpenedModal({ ...openedModal, [locationID]: false });
  };

  return (
    <div className="each-page-layout your-locations-page">
      <div className="responsive-cont">
        <div className="your-location-header">Your locations:</div>
        {userLocations.length > 0 ? (
          userLocations.map((locationID, index) => {
            const myLocation = state.locations[locationID];
            return myLocation ? (
              <React.Fragment key={locationID}>
                <div className="each-your-location">
                  <div className="your-location-name">
                    {index + 1}. {myLocation.name}
                  </div>
                  <Link to={`/location/${locationID}`}>
                    <div className="your-location-view">View</div>
                  </Link>
                  <div
                    className="your-location-delete"
                    onClick={() => {
                      openModal(locationID);
                    }}
                  >
                    Delete
                  </div>
                </div>
                <DeleteConfirmation
                  openedModal={openedModal[locationID]}
                  closeModal={closeModal}
                  deleteData={{ dispatch, uid, locationID }}
                  locationName={myLocation.name}
                />
              </React.Fragment>
            ) : null;
          })
        ) : (
          <div className="no-locations-msg">
            You did not submit any locations...
          </div>
        )}
      </div>
    </div>
  );
};

export default YourLocations;
