import React, { Component } from "react";
import "./ListingsContainer.css";
import Listing from "../Listing/Listing";

class ListingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section
        data-testid="listing-container"
        className="listings-card-container"
      >
        <h2 className="listings-header">
          {this.props.pathname.includes("/favorites")
            ? "Favorites"
            : "Listings"}
        </h2>
        {this.props.favorites.length === 0 &&
        this.props.pathname === "/favorites" ? (
          <div class="no-favorites">
            <h3>You have no favorites!</h3>
          </div>
        ) : (
          ""
        )}
        <div className="listings-container-inner">
          {this.props.listingsData.map(listing => {
            console.log(this.props.favorites);
            return (
              <Listing
                name={listing.name}
                listing_id={listing.listing_id}
                area_id={this.props.area_id}
                key={listing.listing_id}
                favorite={this.props.favorites.includes(listing.listing_id)}
                addDeleteFavorite={this.props.addDeleteFavorite}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

export default ListingsContainer;
