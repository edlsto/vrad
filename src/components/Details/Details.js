import React from "react";
import "./Details.css";

const Details = ({ selectedListing }) => {
  let { name, address, details, listing_id } = selectedListing;
  let { street, zip } = address;
  let { beds, baths, cost_per_night, features } = details;

  console.log(
    name,
    address,
    street,
    zip,
    beds,
    baths,
    cost_per_night,
    features
  );

  let imageIds = ["a", "b", "c"];
  let images = imageIds.map(image => {
    return (
      <img
        src={"../../../images/" + listing_id + `_${image}.jpg`}
        alt=""
        className="listing-img"
      />
    );
  });

  return (
    <section className="details">
      <div>{name}</div>
      <div>
        {street} {zip}
      </div>
      <div>Beds: {beds}</div>
      <div>Baths: {baths}</div>
      <div>Cost per night: {cost_per_night}</div>
      <div>Features: {features}</div>
      {images}
    </section>
  );
};

export default Details;
