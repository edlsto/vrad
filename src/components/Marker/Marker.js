import React from "react";
import "./Marker.css";
import { Link } from "react-router-dom";

class Marker extends React.Component {
  render() {
    return (
      <Link
        to={
          "/areas/" + this.props.area_id + "/listings/" + this.props.listing_id
        }
      >
        <i
          className="fas fa-3x fa-map-marker-alt"
          onClick={e => this.props.handleClick(e)}
        ></i>
      </Link>
    );
  }
}

export default Marker;
