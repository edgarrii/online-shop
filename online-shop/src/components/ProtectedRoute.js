import React, { useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { LOGIN_ROUTE, USER_ROUTE } from "../utils/paths";
import { useSelector } from "react-redux";
import ErrorComponent from "./ErrorComponent/ErrorComponent";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const ProtectedRoute = ({ path, component: Component }) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!currentUser?.userRoles?.includes("admin")) {
      return <ErrorComponent />;
    }
  }, []);

  return <Route path={path} component={Component} exact />;
};

export default ProtectedRoute;
