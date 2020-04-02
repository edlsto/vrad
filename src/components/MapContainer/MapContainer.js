import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
// import Marker from "../Marker/Marker";
import "./MapContainer.css";
import { Link, BrowserRouter as Router } from "react-router-dom";

const style = {
  width: "100%",
  height: "100%"
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

  onMarkerClicked = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    this.props.highlightListing(this.state.selectedPlace.listing_id);
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        selectedPlace: ""
      });
      this.props.highlightListing(this.state.selectedPlace.listing_id);
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
        // streetViewControl={false}
        disableDefaultUI={true}
        styles={[
          // {
          //   featureType: "all",
          //   stylers: [{ color: "#C0C0C0" }]
          // },

          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]}
      >
        {this.props.listings.map(listing => {
          console.log(listing);
          // const infobox = ;
          return (
            <Marker
              position={{ lat: +listing.lat, lng: +listing.lng }}
              // onClick={this.onMarkerClick}
              name={listing.name}
              listing_id={listing.listing_id}
              area_id={listing.area_id}
              onMouseover={this.onMarkerMouseOver}
              onMouseout={this.onMouseOutMarker}
              onClick={this.onMarkerClicked}
              cost={listing.details.cost_per_night}
            />
          );
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div data-testid="listing-card" className="card-map">
            <Router>
              <Link
                to={
                  "/areas/" +
                  this.state.selectedPlace.area_id +
                  "/listings/" +
                  this.state.selectedPlace.listing_id
                }
                className="map-link"
                data-testid={this.state.selectedPlace.listing_id}
              >
                <h3 style={{ background: "#a5d3e5", padding: "1em" }}>
                  {this.state.selectedPlace.name}, $
                  {this.state.selectedPlace.cost}
                </h3>
              </Link>
            </Router>

            {/* <button className="listings-btn">View</button> */}
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC2VvRB0-osXQ_3_fYpHc_LRraYZ29jJdU"
})(MapContainer);
