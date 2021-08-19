import React from "react";
import { Route, Switch } from "react-router-dom";

//layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

//pages
import Homepage from "./pages/Homepage/Homepage";
import Registration from "./pages/Registration/Registration";
import "./default.scss";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
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
      </Switch>
    </div>
  );
}

export default App;
