import React, { Component } from "react";
import "./Login.css";
import { NavLink } from "react-router-dom";

class Login extends Component {
  constructor({ logInUser }) {
    super();

    this.state = {
      username: "",
      email: "",
      visitReason: "",
      nameValid: false,
      emailValid: false,
      reasonValid: false,
      formValid: false,
      loginFailed: false
    };
  }

  updateFormState = e => {
    this.setState({ [e.target.name]: e.target.value }, this.checkField(e));
  };

  checkField = e => {
    let { name, value } = e.target;
    if (name === "username" && value.length > 0) {
      this.setState({ nameValid: true }, this.validateForm);
    } else if (name === "username" && value.length === 0) {
      this.setState({ nameValid: false }, this.validateForm);
    }

    if (name === "email" && value.length > 0 && value.includes("@")) {
      this.setState({ emailValid: true }, this.validateForm);
    } else if (name === "email" && value.length === 0 && !value.includes("@")) {
      this.setState({ emailValid: false }, this.validateForm);
    }

    if (name === "visitReason" && value !== "") {
      this.setState({ reasonValid: true }, this.validateForm);
    } else if (name === "visitReason" && value === "") {
      this.setState({ reasonValid: false }, this.validateForm);
    }
  };

  validateForm = () => {
    this.setState({
      formValid:
        this.state.nameValid && this.state.emailValid && this.state.reasonValid
    });
  };

  throwErrorMessage = () => {
    if (!this.state.nameValid) {
      return "Please enter a valid name";
    } else if (!this.state.emailValid) {
      return "Please enter a valid email address";
    } else if (!this.state.reasonValid) {
      return "Please enter a reason for your visit";
    }
  };

  submitLogin = e => {
    e.preventDefault();
    const user = {
      name: this.state.username,
      email: this.state.email,
      visitReason: this.state.visitReason,
      favorites: []
    };
    if (this.state.formValid) {
      this.props.logInUser(user);
    } else {
      this.setState({ loginFailed: true });
    }
  };

  render() {
    let button = this.state.formValid ? (
      <NavLink className="login-button" to="/areas" role="button">
        Login
      </NavLink>
    ) : (
      <button className="login-button" role="button">
        Login
      </button>
    );
    let error = this.throwErrorMessage();
    return (
      <section className="login-background">
        <form data-testid="form">
          <h2 data-testid="header">Login</h2>
          <p className="error-message">{this.state.loginFailed ? error : ""}</p>
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
            data-testid="select"
            name="visitReason"
            value={this.state.visitReason}
            onChange={e => this.updateFormState(e)}
          >
            <option value="">---Please select reason for visit---</option>
            <option value="business">Business</option>
            <option value="vacation">Vacation</option>
            <option value="other">Other</option>
          </select>
          <div
            className="login-button-container"
            onClick={e => this.submitLogin(e)}
          >
            {button}
          </div>
        </form>
      </section>
    );
  }
}

export default Login;
