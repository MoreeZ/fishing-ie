import React, { createContext, useReducer, useMemo } from "react";

export const addLocationReducer = createContext();

const AddLocationReducerProvider = props => {
  const initialState = {
    name: "",
    quickdesc: "",
    longdesc: "",
    facilities: [],
    fish: [],
    coordinates: {
      lat: 53.3605185,
      lng: -6.2608178
    },
    image: {},
    progress: {
      loading: false,
      success: false,
      error: false
    }
  };

  function reducer(state, action) {
    switch (action.type) {
      case "UPDATE_NAME":
        return {
          ...state,
          name: action.payload
        };
      case "UPDATE_QUICKDESC":
        return {
          ...state,
          quickdesc: action.payload
        };
      case "UPDATE_LONGDESC":
        return {
          ...state,
          longdesc: action.payload
        };
      case "UPDATE_FACILITIES":
        return {
          ...state,
          facilities: action.payload
        };
      case "UPDATE_FISH":
        return {
          ...state,
          fish: action.payload
        };
      case "UPDATE_COORDINATES":
        return {
          ...state,
          coordinates: action.position
        };
      case "LOADING":
        return {
          ...state,
          progress: {
            loading: true,
            success: false,
            error: false
          }
        };
      case "SUCCESS":
        return {
          ...state,
          progress: {
            loading: false,
            success: true,
            error: false
          }
        };
      case "ERROR":
        return {
          ...state,
          progress: {
            loading: false,
            success: false,
            error: true
          }
        };
      case "LOAD_LOCAL_DATA": {
        return { ...state, ...action.data };
      }
      case "SET_IMAGE":
        return {
          ...state,
          image: action.image
        };
      default:
        throw new Error('"Add Location Reducer" must return the state object.');
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  const renderReducer = () => (
    <addLocationReducer.Provider value={{ state, dispatch }}>
      {props.children}
    </addLocationReducer.Provider>
  );
  return useMemo(renderReducer, [state]);
};

export default AddLocationReducerProvider;
