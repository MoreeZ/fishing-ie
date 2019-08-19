import React, { useState, useContext } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import { authReducer } from "../../../reducers/authReducer";
import { locationsReducer } from "../../../reducers/locationsReducer";

const DeleteButton = props => {
  const { dispatch } = useContext(locationsReducer);
  const { uid } = useContext(authReducer).state;
  const [openedModal, setOpenedModal] = useState(false);
  const openModal = () => {
    setOpenedModal(true);
  };

  const closeModal = () => {
    setOpenedModal(false);
  };
  return (
    <React.Fragment>
      <div className="delete-location" onClick={openModal}>
        Delete location
      </div>
      <DeleteConfirmation
        openedModal={openedModal}
        closeModal={closeModal}
        deleteData={{ dispatch, uid, locationID: props.locationID }}
      />
    </React.Fragment>
  );
};

export default DeleteButton;
