import React, { useState } from "react";
import "./SignIn.scss";
import Button from "../Forms/Button/Button";
import { auth, signInWithGoogle } from "../../firebase/utils";
import FormInput from "../Forms/FormInput/FormInput";
import { withRouter } from "react-router-dom";

const SignIn = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
      props.history.push("/");

    } catch (e) {
      
      console.log(e);
      props.history.push("/")
    }
  };

  return (
    <div className="signIn">
      <div className="wrap">
        <h2>Login</h2>

        <div className="formWrap">
          <form onSubmit={handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={(e) => setEmail(e.target.value)}
            />

            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              handleChange={(e) => setPassword(e.target.value)}
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
};

export default withRouter(SignIn);
