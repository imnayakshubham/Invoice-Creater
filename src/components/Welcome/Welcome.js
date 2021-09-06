import React, { useContext } from "react";
import "./Welcome.css";
import image from "../../assests/MessyDoodle.svg";
import rest from "../../assests/GroovySittingDoodle.svg";

import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";

function Welcome() {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  return (
    <div className="welcomepage">
      <div className="welcomepage__left">
        <div>
          <h1 className="greet">Welcome!.</h1>
          {user ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                history.push("/invoices");
              }}
            >
              Create Invoice
            </Button>
          ) : (
            <h3 className="signinmessage">Sign In to create Invoice.</h3>
          )}
          <p className="message">
            Please use in Desktop/Laptop for better Experience.{" "}
          </p>
        </div>
      </div>
      <div className="welcomepage__right">
        <div className="svgcontainer">
          {user ? (
            <img src={rest} alt="Resting" />
          ) : (
            <img src={image} alt="Image" />
          )}
        </div>
        <h1 className="message">Manage Invoice Easily!!</h1>
      </div>
    </div>
  );
}

export default Welcome;
