import React from "react";
import PropTypes from "prop-types";

import "./Area.css";
import { NavLink } from "react-router-dom";

const Area = ({ about, id, shortName, longName, chooseNeighborhood }) => {
  let areaNameNoSpaces = shortName.replace(/\s/g, "");
  let imgSrc = `../images/neighborhoods/${areaNameNoSpaces}.jpg`;

  return (
    <article id={id}>
      <div className="article-inner">
        <div className="title-image-description-container">
          <div className="title-subtitle-container">
            <h3 className="area-title">{shortName}</h3>
          </div>
          <img className="neighborhood-image" src={imgSrc} alt="" />
          <div className="area-card-info">
            <p className="about">{about}</p>
          </div>
        </div>
        <div name={id} className="view-listings-button-container">
          <NavLink
            to={"/areas/" + id + "/listings"}
            className="view-listings-button"
            name={id}
            role="button"
            data-testid={id}
          >
            View Listings
          </NavLink>
        </div>
      </div>
    </article>
  );
};

export default Area;

Area.propTypes = {
  about: PropTypes.string,
  "data-testid": PropTypes.string,
  id: PropTypes.number,
  longName: PropTypes.string,
  shortName: PropTypes.string,
};
