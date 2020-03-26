import React, { Component } from "react";
import "./CardsContainer.css";
import Area from "../Area/Area";
import Listing from "../Listing/Listing";

class CardsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedArea: ""
    };
  }

  chooseNeighborhood = e => {
    console.log(e.target);
    this.setState({ selectedArea: e.target.name });
  };

  render() {
    let cards;
    if (!this.state.selectedArea) {
      cards = this.props.areas.map(area => {
        return (
          <Area
            about={area.about}
            id={area.id}
            key={area.id}
            shortName={area.area}
            longName={area.name}
            chooseNeighborhood={this.chooseNeighborhood}
          />
        );
      });
    } else {
      const selectedAreaListings = this.props.listings.filter(
        listing => listing.area_id === parseInt(this.state.selectedArea)
      );
      cards = selectedAreaListings.map(listing => {
        return (
          <Listing
            listing_id={listing.listing_id}
            name={listing.name}
            address={listing.address}
            details={listing.details}
          />
        );
      });
    }
    let msg = this.state.selectedArea
      ? "Please select a property"
      : "Please select an area";
    return (
      <section className="page-body">
        <h2>{msg}</h2>
        <section
          className={
            this.state.selectedArea
              ? "listings-card-container"
              : "areas-card-container"
          }
        >
          {cards}
        </section>
      </section>
    );
  }
}

export default CardsContainer;
