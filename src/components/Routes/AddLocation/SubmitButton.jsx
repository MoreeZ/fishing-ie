import React, { useContext, useState } from "react";
import { addLocationReducer } from "../../../reducers/addLocationReducer";
import ErrorPopup from "./ErrorPopup";
import { addLocation } from "../../../actions/locationsActions";
import { locationsReducer } from "../../../reducers/locationsReducer";
import { authReducer } from "../../../reducers/authReducer";

const SubmitButton = props => {
  const { state } = useContext(addLocationReducer);
  const { dispatch } = useContext(locationsReducer);
  const dispatchAdd = useContext(addLocationReducer).dispatch;
  const { signedIn, uid } = useContext(authReducer).state;
  const [errors, setErrors] = useState([]);
  const [openedModal, setOpenedModal] = useState(false);
  const verifyFields = () => {
    let arrOfInvalidProps = [];
    for (let prop in state) {
      const value = state[prop];
      if (
        (typeof value === "string" || Array.isArray(value)) &&
        value.length === 0
      ) {
        arrOfInvalidProps.push(prop);
      }
      if (
        prop === "coordinates" &&
        value.lat === 53.3605185 &&
        value.lng === -6.2608178
      ) {
        arrOfInvalidProps.push(prop);
      }
      if (prop === "image" && !value.name) {
        arrOfInvalidProps.push(prop);
      }
    }
    return arrOfInvalidProps;
  };
  const submitForm = () => {
    const invalidProps = verifyFields();
    let arrayOfMessages = [];
    invalidProps.forEach(prop => {
      switch (prop) {
        case "name":
          return arrayOfMessages.push("Location name must be filled out.");
        case "quickdesc":
          return arrayOfMessages.push("Short description must be filled out.");
        case "longdesc":
          return arrayOfMessages.push("Full description must be filled out.");
        case "facilities":
          return arrayOfMessages.push(
            "You must select at least 2 facilities in the area."
          );
        case "fish":
          return arrayOfMessages.push(
            "You must name at least 2 types of fish in the area."
          );
        case "coordinates":
          return arrayOfMessages.push("Please mark your location on the map.");
        case "image":
          return arrayOfMessages.push("Please add an image of the area");
        default:
          throw new Error(
            '"Submit button" switch statement filled out incorrectly'
          );
      }
    });
    setErrors(arrayOfMessages);
    openModal();
    if (arrayOfMessages.length === 0 && signedIn) {
      addLocation(dispatch, dispatchAdd, state, uid);
    } else if (!signedIn) {
      localStorage.setItem("localFormData", JSON.stringify(state));
    }
  };

  const openModal = () => {
    setOpenedModal(true);
  };

  const closeModal = () => {
    setOpenedModal(false);
  };

  return (
    <React.Fragment>
      <button
        id="openModal"
        className="submit-add-location"
        onClick={submitForm}
      >
        Add your location
      </button>
      <ErrorPopup
        openedModal={openedModal}
        closeModal={closeModal}
        errors={errors}
        progress={
          errors.length > 0
            ? { ...state.progress, error: true }
            : state.progress
        }
      />
    </React.Fragment>
  );
};

export default SubmitButton;
