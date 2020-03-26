import React, { Component } from "react";
import "./App.css";
import Nav from "../Nav/Nav";
import Login from "../Login/Login";
import CardsContainer from "../CardsContainer/CardsContainer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userInfo: { name: "", email: "", visitReason: "" },
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
    let content;
    if (this.state.isLoggedIn) {
      content = (
        <CardsContainer
          areas={this.state.areas}
          listings={this.state.listings}
        />
      );
    } else {
      content = <Login logInUser={this.logInUser} />;
    }

    return (
      <div>
        <Nav />
        <main className={this.state.isLoggedIn ? "logged-in" : ""}>
          {content}
        </main>
      </div>
    );
  }
}

export default App;
