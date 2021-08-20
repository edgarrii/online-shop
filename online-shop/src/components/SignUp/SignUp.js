import React, { Component } from "react";
import "./signUp.scss";

import { auth, handleUserProfile } from "../../firebase/utils";

import FormInput from "../Forms/FormInput/FormInput";
import Button from "../Forms/Button/Button";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [""],
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword, errors } =
      this.state;

    if (password !== confirmPassword) {
      const err = [`Password don't match`];
      this.setState({
        errors: err,
      });

      if (password.length < 6) {
        const err = [`Password should be at least 6 characters`];
        this.setState({
          errors: err,
        });
      }
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { displayName });

      this.setState({
        ...initialState,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { displayName, email, password, confirmPassword, errors } =
      this.state;

    return (
      <div className="signUp">
        <div className="wrap">
          <h2>Sign Up</h2>

          {errors.length > 0 && (
            <ul
              style={{
                color: "red",
                listStyle: "none",
                marginTop: 20,
                marginBottom: -10,
              }}
            >
              {errors.map((err, index) => {
                return <li key={index}>{err}</li>;
              })}
            </ul>
          )}

          <div className="formWrap">
            <form onSubmit={this.handleFormSubmit}>
              <FormInput
                type="text"
                name="displayName"
                value={displayName}
                placeholder="Full name"
                onChange={this.handleChange}
              />

              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleChange}
              />

              <FormInput
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
              />

              <FormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />

              <Button className="btn" type="submit">
                Register
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
