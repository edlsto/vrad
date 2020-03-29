import React from "react";
import "./Nav.css";
import { instanceOf } from "prop-types";

const Nav = props => {
  return (
    <nav>
      <h1 className="nav-title">
        VRAD
        <span className="nav-subtitle">Vacation Rentals Around Denver</span>
      </h1>
      {props.userinfo.name && (
        <div className="logged-in-elements">
          <div className="greeting-btn-container">
            <h2 className="greeting">Hello, {props.userinfo.name}</h2>
            <button className="favorite-btn">
              Favorites ({props.userinfo.favorites.length})
            </button>
          </div>
          <div className="log-out-container">
            <button className="log-out">Log out</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
