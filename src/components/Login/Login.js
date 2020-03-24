import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super();

    this.state = {
      username: "",
      email: "",
      visitReason: ""
    };
  }

  updateFormState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitLogin = e => {
    e.preventDefault();
  };

  render() {
    return (
      <form>
        <h2>Login</h2>
        <input
          name="username"
          placeholder="Name"
          type="text"
          value={this.state.username}
          onChange={e => this.updateFormState(e)}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={this.state.email}
          onChange={e => this.updateFormState(e)}
        />
        <select
          name="visitReason"
          value={this.state.visitReason}
          onChange={e => this.updateFormState(e)}
        >
          <option value="">---Please select reason for visit---</option>
          <option value="business">Business</option>
          <option value="vacation">Vacation</option>
          <option value="other">Other</option>
        </select>
        <button onClick={this.submitLogin}>Login</button>
      </form>
    );
  }
}

export default Login;
