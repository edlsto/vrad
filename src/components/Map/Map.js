import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { latLngBounds, bindPopUp } from "leaflet";
import "./Map.css";

export default class SimpleExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 39.742043,
      lng: -104.991531,
      zoom: 13,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  //   componentDidMount() {
  //     // console.log(this.props.listings[0]);
  //   }

  onMarkerClicked = (e) => {
    // console.log(e);
    const listing = e.target.options.listing;
    this.setState({
      selectedPlace: listing,
      showingInfoWindow: true,
    });
    this.props.highlightListing(this.state.selectedPlace.listing_id);
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        selectedPlace: "",
      });
      this.props.highlightListing(this.state.selectedPlace.listing_id);
    }
  };

  render() {
    let bounds;
    if (this.props.listings[0]) {
      bounds = latLngBounds(
        [this.props.listings[0].lat, this.props.listings[0].lng],
        [this.props.listings[0].lat, this.props.listings[0].lng]
      );
      this.props.listings.forEach((listing) => {
        bounds.extend([listing.lat, listing.lng]);
      });
    }

    const position = [this.state.lat, this.state.lng];
    const markers = this.props.listings.map((listing) => {
      console.log(listing);
      return (
        <Marker
          position={[listing.lat, listing.lng]}
          onClick={(e) => this.onMarkerClicked(e)}
          listing={listing}
        >
          <Popup>
            {listing.name}, ${listing.details.cost_per_night}
          </Popup>
        </Marker>
      );
    });

    return (
      <Map
        center={position}
        zoom={this.state.zoom}
        bounds={bounds}
        onClick={this.onMapClicked}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {markers}
      </Map>
    );
  }
}
