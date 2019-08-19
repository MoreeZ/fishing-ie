import React, { useContext, useEffect } from "react";
import landingBG from "../../assets/landing-bg.png";
import logo from "../../assets/logo.svg";
import LocationCard from "../Reusable/LocationCard";
import { locationsReducer } from "../../reducers/locationsReducer";
import { Link } from "react-router-dom";
import { TimelineMax } from "gsap";

const Home = () => {
  const { locations } = useContext(locationsReducer).state;
  // scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    const homeHeading = document.querySelector(".home-heading");
    const homeButton = document.querySelector(".home-button");
    const t1 = new TimelineMax();
    t1.to(homeHeading, 0.2, { opacity: 1 }).delay(0.3);
    t1.to(homeButton, 0.2, { opacity: 1 });
  }, []);

  const objectToArray = object => {
    let arr = [];
    for (let key in object) {
      const mapId = { ...object[key], id: key };
      arr.push(mapId);
    }
    return arr;
  };
  return (
    <div className="home-page each-page-layout">
      <div className="home-top">
        <img src={landingBG} alt="" />
        <div className="home-top-text">
          <div className="home-heading">
            Explore <span className="bold">Fishing</span> In{" "}
            <span className="bold">Ireland</span>
          </div>
          <Link to="/search/1">
            <div className="home-button">EXPLORE</div>
          </Link>
        </div>
      </div>
      <div className="responsive-cont">
        <div className="home-middle">
          <div className="welcome">
            <span>Welcome to </span>
            <img src={logo} alt="" />
          </div>
          <div className="welcome-subheading">
            Ireland is recognised as being the outstanding fishing holiday
            destination in Europe. The vast variety and quality of fishing in
            Ireland makes it the perfect destination for your angling holiday.
          </div>
        </div>
        <div className="home-bottom">
          <div className="top-rated-header">
            EXPLORE TOP RATED LOCATIONS BELOW!
          </div>
          <div className="top-rated-render-space">
            {objectToArray(locations).length > 0 &&
              objectToArray(locations).map((location, index) => {
                if (index < 6) {
                  return <LocationCard key={location.id} info={location} />;
                } else return null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
