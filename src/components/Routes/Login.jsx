import React, { useEffect, useState, useContext } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { authReducer } from "../../reducers/authReducer";
import { signIn } from "../../actions/authActions";

const Login = () => {
  const { state, dispatch } = useContext(authReducer);

  const [details, setDetails] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: [],
    password: []
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = e => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signIn(dispatch, email, password);
  };

  useEffect(() => {
    setErrors({
      email:
        state.errCode === "auth/invalid-email" ||
        state.errCode === "auth/user-not-found"
          ? state.errMsg
          : "",
      password: state.errCode === "auth/wrong-password" ? state.errMsg : ""
    });
  }, [state]);

  return (
    <div className="each-page-layout login-register-pages">
      {!state.signedIn ? (
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-header">Sign In</div>
          <div className="form-already">
            You don't have an account? <NavLink to="/register">Sign Up</NavLink>
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
            <div className="email-error error">{errors.email}</div>
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
            <div className="password-error error">{errors.password}</div>
          </div>
          <div className="login-error error">
            Invalid credentials. Make sure the email and password you have
            entered are correct.
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

export default Login;
