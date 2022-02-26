import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "../Header/Header";
import Invoice from "../Invoice/Invoice";
import PrivateRoute from "../PrivateRoute";
import Profile from "../Profile/Profile";
import ViewInvoice from "../ViewInvoice/ViewInvoice";
import Welcome from "../Welcome/Welcome";
// import Profile from '../Profile/Profile'

function HomeScreen() {
  return (
    <div className="home">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Welcome} />
          {/* <PrivateRoute exact path="/profile" component={Profile} /> */}

          <PrivateRoute exact path="/invoices" component={ViewInvoice} />
          <PrivateRoute exact path="/invoice/:id" component={Invoice} />
          <PrivateRoute exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default HomeScreen;
