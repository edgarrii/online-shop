import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { publicRoutes } from "./routes";
import { ADMIN_ROUTE, AUTHORIZED_ROUTE, USER_ROUTE } from "../utils/paths";
import { useDispatch, useSelector } from "react-redux";
import { auth, getCurrentUser, handleUserProfile } from "../firebase/utils";
import { setCurrentUser } from "../redux/User/user.actions";
import Dashboard from "../pages/Dashboard/Dashboard";
import Admin from "../pages/Admin/Admin";
import ProtectedRoute from "./ProtectedRoute";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const AppRouter = (props) => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();
  console.log(currentUser);
  console.log(getCurrentUser());

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
        <Route
          path={AUTHORIZED_ROUTE}
          render={() => {
            return <Dashboard />;
          }}
          exact
        />
        <ProtectedRoute
          path={ADMIN_ROUTE}
          component={Admin}
          allowedRoles={["admin"]}
        />

        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
        <Redirect to={USER_ROUTE} />
      </Switch>
    </>
  );
};

export default AppRouter;
