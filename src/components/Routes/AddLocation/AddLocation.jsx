import React, { useEffect } from "react";
import AutocompleteMap from "./SelectionMap";
import info from "../../../assets/info.svg";
import DropzoneImage from "./DropzoneImage";
import AddLocationForm from "./AddLocationForm";
import AddLocationReducerProvider from "../../../reducers/addLocationReducer";
import SubmitButton from "./SubmitButton";

const AddLocation = props => {
  useEffect(() => window.scrollTo(0, 0), []);
  useEffect(() => {
    const inputBgs = document.querySelectorAll(".react-inputs-wrapper");
    inputBgs.forEach(bg => {
      const input = bg.querySelector("input");
      input.addEventListener("focus", e => {
        bg.style.border = "1px solid #1bac77";
      });
      input.addEventListener("blur", e => {
        if (input.value.length === 0) {
          bg.style.border = "1px solid #d8d8d8";
        }
      });
    });
    return () => {
      inputBgs.forEach(bg => {
        const input = bg.querySelector("input");
        input.removeEventListener("focus", e => {
          bg.style.border = "1px solid #1bac77";
        });
        input.removeEventListener("blur", e => {
          if (input.value.length === 0) {
            bg.style.border = "1px solid #d8d8d8";
          }
        });
      });
    };
  }, []);

  return (
    <AddLocationReducerProvider>
      <div className="each-page-layout add-location-page">
        <div className="responsive-cont">
          <div className="do-you-know">
            Do you know any good fishing locations in Ireland?
          </div>
          <div className="add-location-content">
            <div className="add-locations-left">
              <div className="add-location-details">
                <AddLocationForm />
              </div>
              <DropzoneImage />
              <div className="autocomplete-map-wrapper">
                <div className="above-map-text">
                  <img src={info} alt="" />
                  <span>
                    Use the search box to find your location and drag the marker
                    to pin-point.
                  </span>
                </div>
                <div className="autocomplete-map-wrapper">
                  <AutocompleteMap />
                </div>
              </div>
              <SubmitButton />
            </div>
          </div>
        </div>
      </div>
    </AddLocationReducerProvider>
  );
};

export default AddLocation;
