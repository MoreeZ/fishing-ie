import React from "react";
import Modal from "react-modal";
import Xbutton from "../../../assets/Xbutton.svg";
import { deleteLocation } from "../../../actions/locationsActions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "none",
    padding: 30
  }
};

Modal.setAppElement("#root");

const DeleteConfirmation = props => {
  const { openedModal, closeModal, locationName } = props;
  const { dispatch, uid, locationID } = props.deleteData;
  const handleDelete = e => {
    deleteLocation(dispatch, uid, locationID);
    closeModal(locationID);
  };
  return (
    <Modal
      isOpen={openedModal}
      onRequestClose={() => {
        closeModal(locationID);
      }}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="error-modal">
        <div className="modal-x-button">
          <img
            src={Xbutton}
            alt=""
            onClick={() => {
              closeModal(locationID);
            }}
          />
        </div>
        <div className="error-message">Are you sure?</div>
        <div className="fix-following">
          The location "{locationName}" is going to be permanently deleted.
        </div>
        <div
          className="finish-form"
          onClick={handleDelete}
          style={{ backgroundColor: "#c13030" }}
        >
          Delete
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
