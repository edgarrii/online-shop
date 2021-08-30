import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { authRoutes, publicRoutes } from "./routes";
import {
  ADMIN_ROUTE,
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  USER_ROUTE,
} from "../utils/paths";
import { useDispatch, useSelector } from "react-redux";
import { auth, getCurrentUser, handleUserProfile } from "../firebase/utils";
import { setCurrentUser } from "../redux/User/user.actions";
import Dashboard from "../pages/Dashboard/Dashboard";
import Admin from "../pages/Admin/Admin";
import ProtectedRoute from "./ProtectedRoute";
import ErrorComponent from "./ErrorComponent/ErrorComponent";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const AppRouter = (props) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          dispatch(
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
            })
          );
        });
      }

      dispatch(setCurrentUser(userAuth));
    });

    return () => {
      authListener();
    };
  }, []);

  return (
    <>
      <Switch>
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
        {currentUser ? (
          <Route
            path={authRoutes[0].path}
            component={authRoutes[0].Component}
          />
        ) : (
          <Redirect to={USER_ROUTE} />
        )}
        {currentUser?.userRoles?.includes("admin") ? (
          <ProtectedRoute
            path={authRoutes[1].path}
            component={authRoutes[1].Component}
          />
        ) : (
          <ErrorComponent />
        )}
        <Redirect to={USER_ROUTE} />
      </Switch>
    </>
  );
};

export default AppRouter;
