import React, { Component } from "react";
import "./SignIn.scss";
import Button from "../Forms/Button/Button";
import { auth, signInWithGoogle } from "../../firebase/utils";
import FormInput from "../Forms/FormInput/FormInput";

const initialState = {
  email: "",
  password: "",
};

class SignIn extends Component {
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

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="signIn">
        <div className="wrap">
          <h2>Login</h2>

          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                handleChange={this.handleChange}
              />

              <FormInput
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                handleChange={this.handleChange}
              />

              <div className="socialSignIn">
                <div className="row">
                  <Button className="btn" type="submit">
                    Login
                  </Button>
                  <Button onClick={signInWithGoogle}>
                    Sign In with Google
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
