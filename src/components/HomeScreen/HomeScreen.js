import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import Header from "../Header/Header";
import Invoice from "../Invoice/Invoice";
import PrivateRoute from "../PrivateRoute";
import Profile from "../Profile/Profile";
import Invoices from "../Invoices/Invoices";
import Welcome from "../Welcome/Welcome";
import CreateInvoice from "./../CreateInvoice/CreateInvoice";

function HomeScreen() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <hr />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <PrivateRoute exact path="/invoices" component={Invoices} />
          <PrivateRoute exact path="/invoice/:id" component={Invoice} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/create" component={CreateInvoice} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default HomeScreen;
