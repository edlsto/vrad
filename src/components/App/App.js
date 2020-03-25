import React, { Component } from "react";
import "./App.css";
import Nav from "../Nav/Nav";
import Login from "../Login/Login";
import CardsContainer from '../CardsContainer/CardsContainer'

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userInfo: { name: "", email: "", visitReason: "" },
      areas: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/areas')
      .then(response => response.json())
      .then(data => {
        const promises = data.areas.map(area => {
          return fetch('http://localhost:3001' + area.details)
            .then(res => res.json())
            .then(info => {
              return {
                area: area.area,
                ...info
              }
            })
        })
        console.log(promises)
        return Promise.all(promises)
      })
      .then(areas => this.setState({ areas }))
      .catch(error => console.error(error))
  }

  logInUser = user => {
    this.setState({
      isLoggedIn: true,
      userInfo: user
    })
  }

  render() {
  let content;
  if (this.state.isLoggedIn) {
    content = <CardsContainer areas={this.state.areas}/>
  } else {
    content = <Login logInUser={this.logInUser}/>
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
