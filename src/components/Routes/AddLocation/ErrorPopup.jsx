import React, { useContext } from "react";
import Modal from "react-modal";
import Xbutton from "../../../assets/Xbutton.svg";
import { authReducer } from "../../../reducers/authReducer";
import { Link } from "react-router-dom";

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

const ErrorPopup = props => {
  const { openedModal, closeModal, errors, progress } = props;
  const { signedIn } = useContext(authReducer).state;
  return (
    <Modal
      isOpen={openedModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {progress.error && errors.length > 0 ? (
        <div className="error-modal">
          <div className="modal-x-button">
            <img src={Xbutton} alt="" onClick={closeModal} />
          </div>
          <div className="error-message">Almost there!</div>
          <div className="fix-following">
            You must go back and fix the following:
          </div>
          <ul className="list-of-errors">
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <div className="finish-form" onClick={closeModal}>
            Finish the form
          </div>
        </div>
      ) : !signedIn ? (
        <div className="error-modal">
          <div className="modal-x-button">
            <img src={Xbutton} alt="" onClick={closeModal} />
          </div>
          <div className="error-message">You must sign in!</div>
          <div className="fix-following">
            In order to upload a new location you must be signed in to our
            website
          </div>
          <Link to="/login">
            <div className="finish-form" onClick={props.closeModal}>
              Sign in now
            </div>
          </Link>
        </div>
      ) : (
        <div className="error-modal">
          <div className="modal-x-button">
            <img src={Xbutton} alt="" onClick={closeModal} />
          </div>
          <div className="error-message">Success!</div>
          <div className="fix-following">
            A new loaction has been added to our databse. <br /> You can remove
            the location by finding it in the search tag and clicking on delete.
          </div>
          <Link to="/">
            <div className="finish-form" onClick={props.closeModal}>
              Back to home
            </div>
          </Link>
        </div>
      )}
    </Modal>
  );
};

export default ErrorPopup;
