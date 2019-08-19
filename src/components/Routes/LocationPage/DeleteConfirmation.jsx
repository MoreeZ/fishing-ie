import React from "react";
import Modal from "react-modal";
import Xbutton from "../../../assets/Xbutton.svg";
import { Link } from "react-router-dom";
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
  const { openedModal, closeModal } = props;
  const handleDelete = e => {
    const { dispatch, uid, locationID } = props.deleteData;
    deleteLocation(dispatch, uid, locationID);
    closeModal();
  };
  return (
    <Modal
      isOpen={openedModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="error-modal">
        <div className="modal-x-button">
          <img src={Xbutton} alt="" onClick={closeModal} />
        </div>
        <div className="error-message">Are you sure?</div>
        <div className="fix-following">
          The location is going to be permanently deleted.
        </div>
        <Link to="/">
          <div
            className="finish-form"
            onClick={handleDelete}
            style={{ backgroundColor: "#c13030" }}
          >
            Delete
          </div>
        </Link>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
