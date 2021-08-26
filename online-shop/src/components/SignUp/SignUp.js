import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./signUp.scss";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../Forms/FormInput/FormInput";
import Button from "../Forms/Button/Button";
import { resetAllAuthForms, signUpUser } from "../../redux/User/user.actions";
import { USER_ROUTE } from "../../utils/paths";

const mapState = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError,
});

const SignUp = (props) => {
  const { signUpSuccess, signUpError } = useSelector(mapState);
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (signUpSuccess) {
      reset();
      dispatch(resetAllAuthForms());
      props.history.replace(USER_ROUTE);
    }
  }, [signUpSuccess]);

  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setErrors(signUpError);
    }
  }, [signUpError]);

  const reset = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUser({ displayName, email, password, confirmPassword }));
  };

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
          <form onSubmit={handleFormSubmit}>
            <FormInput
              type="text"
              name="displayName"
              value={displayName}
              placeholder="Full name"
              handleChange={(e) => setDisplayName(e.target.value)}
            />

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

            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              handleChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button className="btn" type="submit">
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
