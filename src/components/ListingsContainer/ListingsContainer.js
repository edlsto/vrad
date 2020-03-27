import React, { Component } from "react";
import "./ListingsContainer.css";
import Listing from "../Listing/Listing";

class ListingsContainer extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return(
      <section className="listings-card-container">
        <h2>Listings</h2>
      </section>
    )
  }
}

export default ListingsContainer