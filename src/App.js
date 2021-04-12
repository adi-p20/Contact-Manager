import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components//Register";
import PrivateRoute from "./Components/PrivateRoute";

const PageNotFound = () => {
  return <div>Page not found</div>;
};

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/Register" component={Register} />
        <PrivateRoute />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Router>
  );
}
export default App;
