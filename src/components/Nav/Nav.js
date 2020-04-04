import React from "react";
import PropTypes from "prop-types";

import "./Nav.css";
import { Link } from "react-router-dom";
import marker from "../../assets/marker.png";

const Nav = (props) => {
  return (
    <nav>
      <div className="logo-nav">
        <img className="nav-marker" src={marker} alt="" />
        <h2 className="nav-title">
          VRAD
          {/* <span className="nav-subtitle">Vacation Rentals Around Denver</span> */}
        </h2>
      </div>
      {props.userinfo.name && (
        <div className="logged-in-elements">
          <div className="greeting-btn-container">
            <h2 className="greeting">Hello, {props.userinfo.name}</h2>
            <div className="trip-type">
              Trip type: {props.userinfo.visitReason}
            </div>
          </div>
          <div className="nav-btn-container fav-btn">
            <Link to="/favorites" className="nav-btn">
              Favorites ({props.userinfo.favorites.length})
            </Link>
          </div>
          <div
            onClick={(e) => props.logOutUser(e)}
            className="nav-btn-container"
          >
            <Link to="/" className="nav-btn">
              Log out
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;

Nav.propTypes = {
  logOutUser: PropTypes.func,
  userInfo: PropTypes.object,
};
