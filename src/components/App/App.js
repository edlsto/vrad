import React, { Component } from "react";
import "./App.css";
import Nav from "../Nav/Nav";
import Login from "../Login/Login";
import CardsContainer from "../CardsContainer/CardsContainer";
import ListingsContainer from "../ListingsContainer/ListingsContainer";
import Details from "../Details/Details";
import { Route, NavLink, Redirect } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userInfo: { name: "", email: "", visitReason: "", favorites: [] },
      areas: [],
      listings: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/api/v1/areas")
      .then(response => response.json())
      .then(data => {
        const promises = data.areas.map(area => {
          return fetch("http://localhost:3001" + area.details)
            .then(res => res.json())
            .then(info => {
              return {
                area: area.area,
                about: info.about,
                id: info.id,
                name: info.name,
                listings: info.listings
              };
            });
        });
        return Promise.all(promises);
      })
      .then(areas => {
        this.setState({ areas });
        this.getListingsData(areas);
      })
      .catch(error => console.error(error));
  }

  getListingsData = areasData => {
    const result = areasData.reduce((allListings, area) => {
      area.listings.forEach(listing => allListings.push(listing));
      return allListings;
    }, []);
    const promises = result.map(listing => {
      return fetch("http://localhost:3001" + listing).then(response =>
        response.json()
      );
    });
    Promise.all(promises).then(data => this.setState({ listings: data }));
  };

  logInUser = user => {
    this.setState({
      isLoggedIn: true,
      userInfo: user
    });
  };

  render() {
    return (
      <div>
        <Nav userinfo={this.state.userInfo} />
        <main className={this.props.isLoggedIn ? "logged-in" : ""}>
          <Route
            exact
            path="/"
            render={routeValues => (
              <Login logInUser={this.logInUser} {...routeValues} />
            )}
          />
          <Route
            exact
            path="/areas"
            render={routeValues => (
              <CardsContainer areas={this.state.areas} {...routeValues} />
            )}
          />
          <Route
            exact
            path="/areas/:id/listings"
            render={({ match }) => {
              const { id } = match.params;
              let currentlyShownListings = this.state.listings.filter(
                listing => listing.area_id === parseInt(id)
              );
              return (
                <ListingsContainer
                  listingsData={currentlyShownListings}
                  area_id={parseInt(id)}
                />
              );
            }}
          />
          <Route
            exact
            path="/areas/:id/listings/:listing"
            render={({ match }) => {
              const { listing } = match.params;
              let selectedListing = this.state.listings.find(property => {
                return property.listing_id === parseInt(listing);
              });
              if (this.state.listings.length > 0) {
                return <Details selectedListing={selectedListing} />;
              }
            }}
          />
        </main>
      </div>
    );
  }
}

export default App;
