import React, { useEffect, useContext } from "react";
import logo from "../../assets/logo.svg";
import menu from "../../assets/menu.svg";
import { Link, NavLink } from "react-router-dom";
import LoginIcon from "../../assets/login_icon.svg";
import RegisterIcon from "../../assets/register_icon.svg";
import yourLocationsPin from "../../assets/yourLocationsPin.svg";

import { authReducer } from "../../reducers/authReducer";

const Navbar = props => {
  const { state, dispatch } = useContext(authReducer);

  useEffect(() => {
    const accountNav = document.getElementById("account-nav");
    if (accountNav) {
      const dropDown = document.querySelector(".account-dropdown");
      accountNav.addEventListener("mouseover", () => {
        dropDown.setAttribute("class", "account-dropdown opened");
      });
      accountNav.addEventListener("mouseout", () => {
        dropDown.setAttribute("class", "account-dropdown");
      });
    }
  }, [state]);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} className="nav-logo" alt="logo" />
      </Link>
      <ul>
        <NavLink exact to="/" activeClassName="active-link">
          <li className="nav-links">
            <span>Home</span>
          </li>
        </NavLink>
        <NavLink to="/search/1" activeClassName="active-link">
          <li className="nav-links">
            <span>Search</span>
          </li>
        </NavLink>
        <NavLink to="/addlocation" activeClassName="active-link">
          <li className="nav-links">
            <span>Add Location</span>
          </li>
        </NavLink>
        {!state.signedIn ? (
          <li className="nav-links" id="account-nav">
            <span>Account</span>
            <div className="account-dropdown">
              <NavLink to="/login" activeClassName="active-link">
                <div>
                  <img src={LoginIcon} alt="" />
                  <span className="login-nav">Login</span>
                </div>
              </NavLink>
              <NavLink to="/register" activeClassName="active-link">
                <div>
                  <img src={RegisterIcon} alt="" />
                  <span className="register-nav">Register</span>
                </div>
              </NavLink>
            </div>
          </li>
        ) : (
          <li className="nav-links" id="account-nav">
            <span style={{ fontWeight: "bold", color: "#1bac77" }}>
              {state.username}
            </span>
            <div className="account-dropdown">
              <NavLink to="/yourlocations" activeClassName="active-link">
                <div>
                  <img src={yourLocationsPin} alt="" />
                  <span className="register-nav">Your Locations</span>
                </div>
              </NavLink>
              <NavLink to="/signed_out" activeClassName="active-link">
                <div
                  onClick={() => {
                    dispatch({ type: "SIGN_OUT" });
                  }}
                >
                  <img
                    src={LoginIcon}
                    alt=""
                    style={{ transform: "scaleX(-1)" }}
                  />
                  <span className="login-nav">Sign Out</span>
                </div>
              </NavLink>
            </div>
          </li>
        )}
      </ul>
      <div className="menu-icon">
        <img src={menu} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
