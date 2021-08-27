import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import useAdminAuth from "../customHooks/useAdminAuth";
import { LOGIN_ROUTE } from "../utils/paths";
import useAuth from "../customHooks/useAuth";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const ProtectedRoute = ({ allowedRoles, path, component: Component }) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!currentUser || !allowedRoles.includes(currentUser.userRoles[0])) {
      console.log(
        !currentUser || !allowedRoles.includes(currentUser.userRoles[0]),
        currentUser,
        allowedRoles
      );

      history.replace(LOGIN_ROUTE);
    }
  }, []);

  return <Route path={path} component={Component} exact />;
};

export default ProtectedRoute;
