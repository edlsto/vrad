import React, { Component } from "react";
import "./ListingsContainer.css";
import Listing from "../Listing/Listing";

class ListingsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  

  render() {
    let id;
    if(this.props.location.pathname === '/areas/590') {
      id = 590
    } else if(this.props.location.pathname === '/areas/751') {
      id = 751
    } else if(this.props.location.pathname === '/areas/408'){
      id = 408
    } else if(this.props.location.pathname === '/areas/240') {
      id = 240
    }

    let currentlyShownListings = this.props.listingsData.filter(listing => listing.area_id === id)

    console.log(currentlyShownListings)
    return(
      <section className="listings-card-container">
        <h2>Listings</h2>
        {currentlyShownListings.map(listing => {
          return <Listing 
            name={listing.name}
            listing_id={listing.listing_id}
          />
        })}
      </section>
    )
  }
}

export default ListingsContainer