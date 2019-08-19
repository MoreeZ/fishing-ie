import React, { createContext, useReducer, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

export const locationsReducer = createContext();

const LocationsReducerProvider = props => {
  const initialState = {
    locations: {},
    images: []
  };

  function reducer(state, action) {
    switch (action.type) {
      case "IMPORT_LOCATIONS":
        return {
          ...state,
          locations: action.payload
        };
      case "IMPORT_IMAGES":
        return { ...state, images: action.payload };
      case "ADD_IMAGE":
        return { ...state, images: [...state.images, action.image] };
      case "REMOVE_IMAGE":
        return {
          ...state,
          images: state.images.filter(img => img !== action.image)
        };
      default:
        throw new Error("Locations Reducer must return the state object.");
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const locationsRef = firebase.database().ref("locations");
    const imagesRef = firebase.storage().ref("location-images");
    locationsRef.on(
      "value",
      data => {
        dispatch({ type: "IMPORT_LOCATIONS", payload: data.val() });
      },
      err => console.log("Could not get data", err)
    );

    imagesRef
      .listAll()
      .then(res => {
        let allImageLinks = [];
        res.items.forEach(image => {
          image.getDownloadURL().then(url => {
            allImageLinks.push({ fileName: image.name, url });
          });
        });
        return allImageLinks;
      })
      .then(res => {
        dispatch({
          type: "IMPORT_IMAGES",
          payload: res
        });
      })
      .catch(err => console.log("Could not get Images", err));
  }, []);

  return (
    <locationsReducer.Provider value={{ state, dispatch }}>
      {props.children}
    </locationsReducer.Provider>
  );
};

export default LocationsReducerProvider;
