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
      userInfo: { name: "", email: "", visitReason: "" }
    };
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
    content = <CardsContainer />
  } else {
    content = <Login logInUser={this.logInUser}/>
  }

    return (
      <body>
        <Nav />
        <main className={this.state.isLoggedIn ? "logged-in" : ""}>
          {content}
        </main>
      </body>
    );
  }
}

export default App;
