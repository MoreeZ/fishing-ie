import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import uuid from "uuid/v1";

export const addLocation = (dispatch, dispatchAdd, data, uid) => {
  const {
    name,
    quickdesc,
    longdesc,
    facilities,
    fish,
    coordinates,
    image
  } = data;
  const newID = uuid();
  const locationRef = firebase.database().ref(`locations/${newID}`);
  const userRef = firebase
    .database()
    .ref()
    .child(`users/${uid}`);
  const imageRef = firebase
    .storage()
    .ref("location-images/" + newID + image.name.match(/\.([^.]+)$/gi)[0]);

  dispatchAdd({ type: "LOADING" });
  userRef.once("value", res => {
    userRef.update({
      locations: res.val().locations ? [...res.val().locations, newID] : [newID]
    });
    locationRef
      .set({
        coordinates,
        facilities,
        fish,
        longdesc,
        quickdesc,
        name,
        image: newID + image.name.match(/\.([^.]+)$/gi)[0],
        madeBy: res.val().name,
        madeOn: Date.now(),
        madeByUID: uid
      })
      .then(res => {
        return imageRef
          .put(image)
          .then(res => {
            imageRef.updateMetadata({
              customMetadata: {
                owner: uid
              }
            });
            imageRef.getDownloadURL().then(url => {
              dispatch({
                type: "ADD_IMAGE",
                image: {
                  fileName: newID + image.name.match(/\.([^.]+)$/gi)[0],
                  url
                }
              });
              dispatchAdd({ type: "SUCCESS", res });
              localStorage.removeItem("localFormData");
            });
          })
          .catch(err => dispatchAdd({ type: "ERROR", err }));
      })
      .catch(err => dispatchAdd({ type: "ERROR", err }));
  });
};

export const deleteLocation = (dispatch, currentUID, locationID) => {
  const currUserRef = firebase
    .database()
    .ref()
    .child("users/" + currentUID);
  const locationsRef = firebase
    .database()
    .ref()
    .child("locations");
  const imagesRef = firebase.storage().ref("location-images/");
  let imageToDelete = "";

  currUserRef.once("value", res => {
    currUserRef
      .update({
        locations:
          res.val().locations && Array.isArray(res.val().locations)
            ? res.val().locations.filter(loc => loc !== locationID)
            : []
      })
      .then(() => {
        locationsRef.once("value", data => {
          imageToDelete = data.val()[locationID].image;
          locationsRef.child(locationID).remove();
        });
      })
      .then(() => {
        imagesRef
          .child(imageToDelete)
          .delete()
          .then(() => {
            dispatch({ type: "REMOVE_IMAGE", image: res });
          })
          .catch(err => console.log("Can't delete image", err));
      })
      .catch(err => console.log(err));
  });
};
