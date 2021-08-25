import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils";
import { setCurrentUser } from "./redux/User/user.actions";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

// hoc
import WithAuth from "./hoc/withAuth";

//pages
import Homepage from "./pages/Homepage/Homepage";
import Registration from "./pages/Registration/Registration";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/LoginPage/LoginPage";

import "./default.scss";

const App = (props) => {
  const { currentUser, setCurrentUser } = props;

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });

    return () => {
      authListener();
    };
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          exact
          path="/login"
          render={() => (
            <MainLayout>
              <LoginPage />
            </MainLayout>
          )}
        />
        <Route
          path="/registration"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
