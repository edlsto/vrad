import React from "react";
import PropTypes from "prop-types";
import "./Listing.css";
import { Link } from "react-router-dom";

const Listing = (props) => {
  return (
    <div
      data-testid="listing-card"
      className={props.highlighted ? "card highlighted" : "card"}
    >
      <div className="property-title">
        <h3 className="property-title-text">{props.name}</h3>
      </div>
      <div className="image-btn">
        <img
          src={
            process.env.PUBLIC_URL + "/images/" + props.listing_id + "_a.jpg"
          }
          className="listings-page-img"
          alt={props.name}
        />
        <div className="btns-container">
          <Link
            to={"/areas/" + props.area_id + "/listings/" + props.listing_id}
            className="listings-btn"
            data-testid={props.listing_id}
          >
            View
          </Link>
          <div
            data-testid="favorite-btn"
            className="listing-heart-container"
            onClick={(e) => props.addDeleteFavorite(props.listing_id)}
          >
            <i
              className={
                props.favorite
                  ? "fas fa-heart listing-heart listing-heart-active fa-2x"
                  : "fas fa-heart listing-heart listing-heart-inactive fa-2x"
              }
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;

Listing.propTypes = {
  name: PropTypes.string,
  listing_id: PropTypes.number,
  area_id: PropTypes.number,
  addDeleteFavorite: PropTypes.func,
  favorite: PropTypes.bool,
};
