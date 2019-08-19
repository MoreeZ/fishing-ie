import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export const signUp = (dispatch, email, password, username) => {
  const auth = firebase.auth();
  const usersRef = firebase.database().ref("users");
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      usersRef
        .update({
          [res.user.uid]: {
            name: username,
            permissions: "guest"
          }
        })
        .then(() => {
          usersRef
            .once("value", data => {
              dispatch({
                type: "SIGN_UP_SUCCESS",
                uid: res.user.uid,
                user: { ...data.val(), name: username }
              });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log('Failed to update firebase "users/"', err));
    })
    .catch(err => {
      console.log("FAILED TO REGISTER", err);
      dispatch({ type: "SIGN_UP_ERROR", error: err.message });
    });
};

export const signIn = (dispatch, email, password) => {
  const auth = firebase.auth();
  const usersRef = firebase.database().ref("users");
  auth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      usersRef
        .once("value", data => {
          dispatch({
            type: "SIGN_IN_SUCCESS",
            uid: res.user.uid,
            user: data.val()[res.user.uid]
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: "SIGN_IN_ERROR",
        errMsg: err.message,
        errCode: err.code
      });
    });
};
