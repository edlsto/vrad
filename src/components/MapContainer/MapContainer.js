import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import Pin from "./Pin/Pin";

const style = {
  width: "50%",
  height: "50%"
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    var points = this.props.listings.map(listing => {
      return {
        lat: +listing.lat,
        lng: +listing.lng
      };
    });
    console.log(points);
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }

    //   [
    //   { lat: 42.02, lng: -77.01 },
    //   { lat: 42.03, lng: -77.02 },
    //   { lat: 41.03, lng: -77.04 },
    //   { lat: 42.05, lng: -77.02 }
    // ];
    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 39.742043,
          lng: -104.991531
        }}
        zoom={12}
        onClick={this.onMapClicked}
        bounds={bounds}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC2VvRB0-osXQ_3_fYpHc_LRraYZ29jJdU"
})(MapContainer);
