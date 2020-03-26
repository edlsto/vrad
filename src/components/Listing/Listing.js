import React from "react";
import "./Listing.css";

const Listing = props => {
  return (
    <div className="card">
      <div>{props.name}</div>
      <img src="../../../public/images/" alt="" />
    </div>
  );
};

export default Listing;
