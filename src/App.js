import React from "react";
import { Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ListPage from "./pages/ListPage";
import { Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <PrivateRoute>
          <ListPage />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
