import React from "react";
import "./Nav.css";
import { instanceOf } from "prop-types";

const Nav = props => {
  return (
    <nav>
      <h1>
        VRAD<span className="nav-small">Vacation Rentals Around Denver</span>
      </h1>
      {props.userinfo.name && (
        <div className="logged-in-elements">
          <div className="greeting-btn-container">
            <h2 className="greeting">Hello, {props.userinfo.name}</h2>
            <div className="trip-type">
              Trip type: {props.userinfo.visitReason}
            </div>
          </div>
          <div className="nav-btn-container fav-btn">
            <button className="nav-btn">
              Favorites ({props.userinfo.favorites.length})
            </button>
          </div>
          <div className="nav-btn-container">
            <button className="nav-btn">Log out</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
