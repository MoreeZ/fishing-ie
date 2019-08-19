import React from "react";
import insta from "../../assets/insta.svg";
import twitter from "../../assets/twitter.svg";
import fb from "../../assets/fb.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <ul className="footer-nav">
          <li>Home</li>
          <li>About</li>
          <li>Locations</li>
          <li>Search</li>
        </ul>
        <div className="footer-media">
          <img src={insta} alt="" />
          <img src={twitter} alt="" />
          <img src={fb} alt="" />
        </div>
      </div>
      <div className="copyright">
        Policy & Agreement | Privacy Policy | Cookie Policy | Manage Cookie |
        Your Information © 2000-2019 fishing.ie All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
