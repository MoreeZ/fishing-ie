import React, { useContext, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { locationsReducer } from "../../reducers/locationsReducer";

const LocationCard = props => {
  const { images } = useContext(locationsReducer).state;
  const [imageURL, setImageURL] = useState(
    "http://longwhiteclouds.com/wp-content/themes/longwhiteclouds/images/missing-image-640x360.png"
  );

  useMemo(() => {
    const findImage = images.find(image => image.fileName === props.info.image);
    if (images) {
      if (findImage) {
        setImageURL(findImage.url);
      }
    }
  }, [images, props.info.image]);

  const renderCard = () => {
    const { name, quickdesc, id } = props.info;
    return (
      <div className="location-card">
        <div className="image">
          <Link to={`/location/${id}`}>
            <img src={imageURL} alt="" />
          </Link>

          <div className="image-mask" />
          <div className="place-name">{name}</div>
        </div>
        <div className="bottom-section">
          <div className="quick-desc">{quickdesc}</div>
          <Link to={"location/" + id}>
            <div className="more-details-btn">MORE DETAILS</div>
          </Link>
        </div>
      </div>
    );
  };
  return useMemo(renderCard, [props.info, imageURL]);
};

export default LocationCard;
