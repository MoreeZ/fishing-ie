import React, { useEffect, useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { authReducer } from "../../reducers/authReducer";

import { signUp } from "../../actions/authActions";

const Register = () => {
  const { state, dispatch } = useContext(authReducer);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [details, setDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: ""
  });
  const [errors, setErrors] = useState({
    email: [],
    password: [],
    confirmPassword: []
  });

  const handleChange = e => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    });
  };

  const checkForErrors = errors => {
    let hasErrors = false;
    for (let error in errors) {
      if (errors[error].length !== 0) {
        hasErrors = true;
      }
    }
    return hasErrors;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const containsLetter = /(?=.*[a-z])/;
    const containsNumber = /(?=.*\d)/;
    const containsEight = /.{8,50}/;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;

    let emailErr = emailRegex.test(email) ? [] : ["Invalid email"];
    let passErr = [];
    if (!containsLetter.test(password)) {
      passErr.push("Must contain at least one letter.");
    }
    if (!containsNumber.test(password)) {
      passErr.push("Must contain at least one number.");
    }
    if (!containsEight.test(password)) {
      passErr.push("Must be at least 8 characters long.");
    }
    let confErr =
      confirmPassword === details.password ? [] : ["Passwords must match"];

    const resultsWithErrors = {
      email: emailErr,
      password: passErr,
      confirmPassword: confErr
    };

    setErrors(resultsWithErrors);
    if (!checkForErrors(resultsWithErrors)) {
      signUp(dispatch, email, password, username);
    }
  };

  useEffect(() => {
    if (state.regError && !checkForErrors(errors)) {
      setErrors({
        ...errors,
        email: [state.regError]
      });
    }
    if (state.regError && !checkForErrors(errors)) {
      setDetails({
        email: "",
        password: "",
        confirmPassword: "",
        username: ""
      });
    }
  }, [state, errors]);
  return (
    <div className="each-page-layout login-register-pages">
      {!state.signedIn ? (
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-header">Sign Up</div>
          <div className="form-already">
            You already have an account? <Link to="/login">Sign In</Link>
          </div>
          <div className="each-form-field">
            <span>Display Name</span>
            <input
              onSubmit={handleSubmit}
              type="text"
              className="form-username"
              name="username"
              onChange={handleChange}
              value={details.username}
              required
            />
          </div>
          <div className="each-form-field">
            <span>Email</span>
            <input
              type="email/text"
              className="form-email"
              name="email"
              onChange={handleChange}
              autoComplete="off"
              value={details.email}
              style={errors.email.length > 0 ? { border: "red 1px solid" } : {}}
              required
            />
            <div className="email-error error">{errors.email[0]}</div>
          </div>
          <div className="each-form-field">
            <span>Password</span>
            <input
              type="password"
              className="form-password"
              name="password"
              onChange={handleChange}
              value={details.password}
              style={
                errors.password.length > 0 ? { border: "red 1px solid" } : {}
              }
              required
            />
            <ul className="password-error error">
              {errors.password.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
          <div className="each-form-field">
            <span>Confirm Password</span>
            <input
              type="password"
              className="form-confirm-password"
              name="confirmPassword"
              onChange={handleChange}
              value={details.confirmPassword}
              style={
                errors.confirmPassword.length > 0
                  ? { border: "red 1px solid" }
                  : {}
              }
              required
            />
            <div className="confirm-password-error error">
              {errors.confirmPassword[0]}
            </div>
          </div>
          <button type="submit" className="form-button">
            Sign In
          </button>
        </form>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default Register;
