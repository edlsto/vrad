import React, { Component } from "react";
import "./App.css";
import Nav from "../Nav/Nav";
import Login from "../Login/Login";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userInfo: { name: "", email: "", visitReason: "" }
    };
  }

  render() {
    return (
      <body>
        <Nav />
        <main>
          <Login />
        </main>
      </body>
    );
  }
}

export default App;
