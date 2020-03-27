import React from "react";
import "./Area.css";
import { NavLink } from 'react-router-dom'

const Area = ({ about, id, shortName, longName, chooseNeighborhood }) => {
  return (
    <article id={id}>
      <div className="area-card-info">
        <h3>{shortName}</h3>
        <h4>{longName}</h4>
        <p>{about}</p>
      </div>
      <div name={id} className="view-listings-button-container">
        <NavLink to={'/areas/' + id} className="view-listings-button" name={id}>
          View Listings
        </NavLink>
      </div>
    </article>
  );
};

export default Area;
