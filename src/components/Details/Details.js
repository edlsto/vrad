import React from "react";
import PropTypes from "prop-types";

import "./Details.css";
import Carousel from "../Carousel/Carousel";

const Details = ({ selectedListing, addDeleteFavorite, favorites }) => {
  let { name, address, details, listing_id } = selectedListing;
  let { street, zip } = address;
  let { beds, baths, cost_per_night, features } = details;

  const uppercase = string => {
    let stringArray = string.split("");
    stringArray[0] = stringArray[0].toUpperCase();
    let newWord = stringArray.join("");
    return newWord;
  };

  return (
    <section className="details">
      <div className="title-btn-container">
        <div className="title-address-container">
          <h1 className="details-title">{name}</h1>
          <h2 className="details-address">
            {street} {zip}
          </h2>
        </div>
        <button
          className={
            favorites.includes(listing_id)
              ? "details-active"
              : "details-fav-btn"
          }
          onClick={e => addDeleteFavorite(listing_id)}
        >
          <i
            className={
              favorites.includes(listing_id) ? "fas fa-heart" : "far fa-heart"
            }
          ></i>
          Favorite
        </button>
      </div>
      <div className="details-body">
        <div className="other-details-container">
          <div className="bed-bath-container">
            <div className="bed-bath-display">
              <div className="num-beds">{beds}</div> <div>beds</div>
            </div>
            <div className="bed-bath-display">
              <div className="num-baths">{baths}</div> <div>baths</div>
            </div>
          </div>
          <div className="cost-per-night-container">
            <span className="cost-highlight">${cost_per_night}</span>/night
          </div>

          {!!features.length && (
            <div className="features-list">
              <h3 className="features-title">Features</h3>
              <ul>
                {features.map((feature, i) => {
                  return <li key={i}>{uppercase(feature)}</li>;
                })}
              </ul>
            </div>
          )}
        </div>
        <Carousel listing_id={listing_id} />
      </div>
    </section>
  );
};

export default Details;

Details.propTypes = {
  addDeleteFavorite: PropTypes.func,
  favorites: PropTypes.array,
  selectedListing: PropTypes.object
};
