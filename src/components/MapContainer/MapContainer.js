import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
// import Marker from "../Marker/Marker";

const style = {
  width: "50%",
  height: "50%"
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  onMouseoverMarker() {
    console.log("hi");
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

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
      >
        {this.props.listings.map(listing => {
          return (
            <Marker
              position={{ lat: +listing.lat, lng: +listing.lng }}
              onClick={this.onMarkerClick}
              name={listing.name}
            />
          );
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h3>{this.state.selectedPlace.name}</h3>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC2VvRB0-osXQ_3_fYpHc_LRraYZ29jJdU"
})(MapContainer);
