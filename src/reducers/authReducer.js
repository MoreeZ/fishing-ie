import React, { createContext, useReducer, useMemo } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export const authReducer = createContext();

const AuthReducerProvider = props => {
  function authUser() {
    return new Promise(function(resolve, reject) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(user);
        } else {
          reject("User not logged in");
        }
      });
    });
  }

  const initialState = {
    signedIn: false,
    errMsg: "",
    errCode: "",
    uid: "",
    permissions: "guest",
    username: "",
    userLocations: []
  };
  function reducer(state, action) {
    switch (action.type) {
      case "USER_STATE":
        return {
          ...state,
          signedIn: action.state,
          uid: action.uid,
          permissions: action.user.permissions,
          username: action.user.name
        };
      case "SIGN_OUT":
        firebase.auth().signOut();
        return { ...state, signedIn: false, uid: "", permissions: "guest" };
      case "SIGN_IN_ERROR":
        return {
          ...state,
          signedIn: false,
          errMsg: action.errMsg,
          errCode: action.errCode
        };
      case "SIGN_IN_SUCCESS":
        return {
          signedIn: true,
          errMsg: "",
          errCode: "",
          permissions: action.user.permissions,
          uid: action.uid,
          username: action.user.name,
          userLocations: action.user.locations ? action.user.locations : []
        };
      case "SIGN_UP_SUCCESS":
        return {
          ...state,
          signedIn: true,
          regError: false,
          permissions: action.user.permissions,
          uid: action.uid,
          username: action.user.name,
          userLocations: action.user.locations ? action.user.locations : []
        };
      case "UPDATE_USER_LOCATIONS":
        return {
          ...state,
          userLocations: action.userLocations ? action.userLocations : []
        };
      case "SIGN_UP_ERROR":
        return { ...state, signedIn: false, regError: action.error };
      default:
        throw new Error("Auth Reducer must return the state object.");
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  useMemo(() => {
    authUser().then(
      userRes => {
        const userRef = firebase
          .database()
          .ref()
          .child("users/" + userRes.uid);
        userRef
          .once("value", res => {
            dispatch({
              type: "USER_STATE",
              state: true,
              uid: userRes.uid,
              user: res.val()
            });
          })
          .catch(err => {
            console.log(err);
          });

        const userLocationsRef = firebase
          .database()
          .ref()
          .child("users/" + userRes.uid + "/locations");
        userLocationsRef.on("value", data => {
          dispatch({
            type: "UPDATE_USER_LOCATIONS",
            userLocations: data.val()
          });
        });
      },
      error => {
        dispatch({
          type: "USER_STATE",
          state: false,
          user: { permissions: "guest", name: "" },
          uid: ""
        });
        console.log(error);
      }
    );
  }, []);
  return (
    <authReducer.Provider value={{ state, dispatch }}>
      {props.children}
    </authReducer.Provider>
  );
};

export default AuthReducerProvider;
