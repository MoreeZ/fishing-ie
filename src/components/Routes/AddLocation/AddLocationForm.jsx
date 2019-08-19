import React, { useContext, useMemo, useEffect } from "react";
import ReactTagInputs from "./ReactTagInputs";
import { addLocationReducer } from "../../../reducers/addLocationReducer";

const AddLocationForm = props => {
  const { state, dispatch } = useContext(addLocationReducer);

  const handleChangeText = (type, value, maxLength) => {
    if (value.length <= maxLength || maxLength === 0) {
      dispatch({ type, payload: value });
    }
  };

  useEffect(() => {
    dispatch({
      type: "LOAD_LOCAL_DATA",
      data: JSON.parse(localStorage.getItem("localFormData"))
    });
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
  };
  const renderForm = () => (
    <form className="add-location-details-form" onSubmit={handleSubmit}>
      <div className="each-form-field add-location-form-field">
        <span>Location Name</span>
        <div className="textarea-wrapper">
          <input
            type="text"
            autoComplete="off"
            placeholder="Max 18 characters"
            required
            onChange={e => handleChangeText("UPDATE_NAME", e.target.value, 18)}
            value={state.name}
          />
          <div
            className="amount-of-chars"
            style={{
              right: 10,
              bottom: 9.5,
              color: state.name.length === 18 && "#ED344E"
            }}
          >
            {state.name.length} / 18
          </div>
        </div>
      </div>
      <div className="each-form-field add-location-form-field">
        <span>Short Description</span>
        <div className="textarea-wrapper">
          <textarea
            type="text"
            autoComplete="off"
            placeholder="Max 160 characters"
            required
            onChange={e =>
              handleChangeText("UPDATE_QUICKDESC", e.target.value, 160)
            }
            value={state.quickdesc}
          />
          <div
            className="amount-of-chars"
            style={
              state.quickdesc.length >= 130 && state.quickdesc.length !== 160
                ? { color: "#EDAE34" }
                : state.quickdesc.length === 160
                ? { color: "#ED344E" }
                : {}
            }
          >
            {state.quickdesc.length} / 160
          </div>
        </div>
      </div>
      <div className="each-form-field add-location-form-field">
        <span>Full Description</span>
        <div className="textarea-wrapper">
          <textarea
            type="text"
            className="go-all-out"
            autoComplete="off"
            placeholder="Go all out"
            required
            onChange={e =>
              handleChangeText("UPDATE_LONGDESC", e.target.value, 0)
            }
            value={state.longdesc}
          />
          <div className="amount-of-chars">{state.longdesc.length}</div>
        </div>
      </div>
      <div className="each-form-field add-location-form-field">
        <ReactTagInputs
          placeholder="Add facility"
          type="UPDATE_FACILITIES"
          heading="Facilities in the area"
          stateKey="facilities"
        />
      </div>

      <div className="each-form-field add-location-form-field">
        <ReactTagInputs
          placeholder="Add fish"
          type="UPDATE_FISH"
          heading="Types of fish in the area"
          stateKey="fish"
        />
      </div>
    </form>
  );
  return useMemo(renderForm, [state]);
};
export default AddLocationForm;
