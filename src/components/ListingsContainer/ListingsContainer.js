import React from "react";
import PropTypes from "prop-types";
import "./ListingsContainer.css";
import Listing from "../Listing/Listing";

const ListingsContainer = props => {
  return (
    <section
      data-testid="listing-container"
      className="listings-card-container"
    >
      <h2 className="listings-header">
        {props.pathname.includes("/favorites") ? "Favorites" : "Listings"}
      </h2>
      {props.favorites.length === 0 && props.pathname === "/favorites" ? (
        <div class="no-favorites">
          <h3>You have no favorites!</h3>
        </div>
      ) : (
        ""
      )}
      <div className="listings-container-inner">
        {props.listingsData.map(listing => {
          return (
            <Listing
              name={listing.name}
              listing_id={listing.listing_id}
              area_id={props.area_id}
              key={listing.listing_id}
              favorite={props.favorites.includes(listing.listing_id)}
              addDeleteFavorite={props.addDeleteFavorite}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ListingsContainer;

ListingsContainer.propTypes = {
  addDeleteFavorite: PropTypes.func,
  area_id: PropTypes.number,
  favorites: PropTypes.array,
  pathname: PropTypes.string,
  listingsData: PropTypes.array
};
