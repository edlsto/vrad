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
        <h2 className="listings-header">Listings</h2>
        <div className="listings-container-inner">
          {this.props.listingsData.map(listing => {
            return (
              <Listing
                name={listing.name}
                listing_id={listing.listing_id}
                area_id={this.props.area_id}
                key={listing.listing_id}
              />
            );
          })}
        </div>
      </section>
    );
  }
}

export default ListingsContainer;
