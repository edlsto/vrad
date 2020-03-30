import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

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
            <div className="trip-type">
              Trip type: {props.userinfo.visitReason}
            </div>
          </div>
          <div  className="nav-btn-container fav-btn">
            <Link to="/favorites" className="nav-btn">
              Favorites ({props.userinfo.favorites.length})
            </Link>
          </div>
          <div onClick={e => props.logOutUser(e)} className="nav-btn-container">
            <Link to="/" className="nav-btn">Log out</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
