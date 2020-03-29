import React from "react";
import "./Listing.css";
import { Link } from "react-router-dom";

const Listing = props => {
  return (
    <div className="card">
      <div className="property-title">
        <h3>{props.name}</h3>
      </div>
      <div className="image-btn">
        <img
          src={"../../../images/" + props.listing_id + "_a.jpg"}
          className="listings-page-img"
          alt=""
        />
        {/* <button className="listings-btn">View</button> */}
        <Link
          to={"/areas/" + props.area_id + "/listings/" + props.listing_id}
          className="listings-btn"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default Listing;
