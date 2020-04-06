import React, { Component } from "react";
import "./App.css";
import Nav from "../Nav/Nav";
import Login from "../Login/Login";
import CardsContainer from "../CardsContainer/CardsContainer";
import ListingsContainer from "../ListingsContainer/ListingsContainer";
import Details from "../Details/Details";
import { Route, Redirect } from "react-router-dom";
import { getAllListings } from "../../helpers.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: { name: "", email: "", visitReason: "", favorites: [] },
      areas: [],
      listings: [],
    };
  }

  componentDidMount() {
    fetch("https://vrad-api.herokuapp.com/api/v1/areas")
      .then((response) => response.json())
      .then((data) => {
        const promises = data.areas.map((area) => {
          return fetch("https://vrad-api.herokuapp.com" + area.details)
            .then((res) => res.json())
            .then((info) => {
              return {
                area: area.area,
                about: info.about,
                id: info.id,
                name: info.name,
                listings: info.listings,
              };
            });
        });
        return Promise.all(promises);
      })
      .then((areas) => {
        this.setState({ areas });
        this.getListingsData(areas);
      })
      .catch((error) => console.error(error));

    if (!this.state.userInfo.name) {
      console.log("no one signed in");
      console.log(JSON.parse(localStorage.getItem("userInfo")));
      const userFromLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
      this.setState({ userInfo: userFromLocalStorage });
    }
  }

  getListingsData = (areasData) => {
    getAllListings(areasData).then((data) => this.setState({ listings: data }));
  };

  logInUser = (user) => {
    this.setState({
      userInfo: user,
    });
    localStorage.setItem("userInfo", JSON.stringify(user));
  };

  addDeleteFavorite = (id) => {
    let currentFavorites = this.state.userInfo.favorites;
    if (currentFavorites.includes(id)) {
      currentFavorites.splice(currentFavorites.indexOf(id), 1);
      this.setState({
        userInfo: {
          name: this.state.userInfo.name,
          email: this.state.userInfo.email,
          visitReason: this.state.userInfo.visitReason,
          favorites: currentFavorites,
        },
      });
    } else {
      let userFavorites = currentFavorites.concat([id]);
      this.setState({
        userInfo: {
          name: this.state.userInfo.name,
          email: this.state.userInfo.email,
          visitReason: this.state.userInfo.visitReason,
          favorites: userFavorites,
        },
      });
    }
  };

  logOutUser = () => {
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ name: "", email: "", visitReason: "", favorites: [] })
    );
    this.setState({
      userInfo: { name: "", email: "", visitReason: "", favorites: [] },
    });
  };

  render() {
    //  if (localStorage.userInfo) {
    //    console.log(JSON.parse(localStorage.getItem("userInfo")));
    //  }
    return (
      <div>
        {this.state.userInfo.name && (
          <Nav userinfo={this.state.userInfo} logOutUser={this.logOutUser} />
        )}
        <main>
          <Route
            exact
            path="/"
            render={(routeValues) =>
              !this.state.userInfo.name ? (
                <Login logInUser={this.logInUser} {...routeValues} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/areas",
                  }}
                />
              )
            }
          />
          <Route
            exact
            path="/areas"
            render={(routeValues) =>
              this.state.userInfo.name ? (
                <CardsContainer areas={this.state.areas} {...routeValues} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
              )
            }
          />
          <Route
            exact
            path="/areas/:id/listings"
            render={({ match, history }) => {
              const { id } = match.params;
              const { pathname } = history.location;
              let currentlyShownListings = this.state.listings.filter(
                (listing) => listing.area_id === parseInt(id)
              );
              return this.state.userInfo.name ? (
                <ListingsContainer
                  listingsData={currentlyShownListings}
                  area_id={parseInt(id)}
                  pathname={pathname}
                  favorites={this.state.userInfo.favorites}
                  addDeleteFavorite={this.addDeleteFavorite}
                />
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
              );
            }}
          />
          <Route
            exact
            path="/areas/:id/listings/:listing"
            render={({ match }) => {
              const { listing } = match.params;
              let selectedListing = this.state.listings.find((property) => {
                return property.listing_id === parseInt(listing);
              });
              if (this.state.listings.length > 0) {
                return this.state.userInfo.name ? (
                  <Details
                    selectedListing={selectedListing}
                    addDeleteFavorite={this.addDeleteFavorite}
                    favorites={this.state.userInfo.favorites}
                  />
                ) : (
                  <Redirect
                    to={{
                      pathname: "/",
                    }}
                  />
                );
              }
            }}
          />
          <Route
            exact
            path="/favorites"
            render={(routeValues) => {
              const { pathname } = routeValues.location;
              let favoriteListings = this.state.userInfo.favorites.map(
                (favorite) => {
                  return this.state.listings.find(
                    (listing) => listing.listing_id === favorite
                  );
                }
              );
              return this.state.userInfo.name ? (
                <ListingsContainer
                  listingsData={favoriteListings}
                  {...routeValues}
                  pathname={pathname}
                  favorites={this.state.userInfo.favorites}
                  addDeleteFavorite={this.addDeleteFavorite}
                />
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
              );
            }}
          />
        </main>
      </div>
    );
  }
}

export default App;
