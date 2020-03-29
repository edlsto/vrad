import React from "react";
import "./Area.css";
import { NavLink } from "react-router-dom";

const Area = ({ about, id, shortName, longName, chooseNeighborhood }) => {
  console.log(shortName);
  let areaNameNoSpaces = shortName.replace(/\s/g, "");
  let sectionStyle = {
    backgroundImage: `url(../images/neighborhoods/${areaNameNoSpaces}.jpg)`
  };

  return (
    <article name="hi" style={sectionStyle} id={id}>
      <div className="area-card-info">
        <h3 className="area-title">
          <span className="area-highlight">{shortName}</span>
        </h3>
        <h4 className="area-subtitle">
          <span className="area-highlight">{longName}</span>
        </h4>
        <p className="about">{about}</p>
      </div>
      <div name={id} className="view-listings-button-container">
        <NavLink data-testid={id} role="button" to={"/areas/" + id} className="view-listings-button" name={id}>
          View Listings
        </NavLink>
      </div>
    </article>
  );
};

export default Area;
