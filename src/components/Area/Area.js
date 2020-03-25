import React from "react";
import "./Area.css";


const Area = ({ about, id, shortName, longName, listings }) => {
  return(
    <article id={id}>
      <div className="area-card-info">
        <h3>{shortName}</h3>
        <h4>{longName}</h4>
        <p>{about}</p>
      </div>
      <button className="view-listings-button">View Listings</button>
    </article>
  )
}

export default Area