import React, { useContext } from "react";
import "./Welcome.css";
import image from "../../assests/MessyDoodle.svg";
import rest from "../../assests/GroovySittingDoodle.svg";
import "./Welcome.css";

import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseconfig/firebase";
import firebase from "firebase";

const provider = new firebase.auth.GoogleAuthProvider();
export const handleLogin = () => {
  auth.signInWithPopup(provider);
};

function Welcome() {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  return (
    <Container fixed disableGutters style={{ marginTop: "100px" }}>
      <div className="welcomepage">
        <div className="mainImage">
          <img
            src={user ? rest : image}
            style={{ height: "400px", width: "400px" }}
            alt="Home"
          />
        </div>
        <div className="info">
          <h1 className="greet">Manage Your Invoices Easily.</h1>
          <p className="moto" style={{ fontSize: "20px" }}>
            <Link to={"/"} className={"link"} style={{ color: "blue" }}>
              Invoicer
            </Link>{" "}
            makes your life easier when it comes to billing and collecting
            money.
          </p>
          <div style={{ marginTop: "50px" }} className={"mainLoginBtn"}>
            {user ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: 250,
                }}
              >
                <Button
                  style={{ marginBottom: 10 }}
                  className="actionBtn1"
                  onClick={() => {
                    history.push("invoices");
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      fontSize: "15px",
                      padding: "0px 20px",
                    }}
                  >
                    View Invoices 📄
                  </p>
                </Button>
                <Button
                  className="actionBtn2"
                  onClick={() => {
                    history.push("profile");
                  }}
                >
                  <p
                    style={{
                      color: "white",
                      fontSize: "15px",
                      padding: "0px 20px",
                    }}
                  >
                    Update Profile ✨
                  </p>
                </Button>
              </div>
            ) : (
              <Button className="loginBtn" onClick={handleLogin}>
                <p
                  style={{
                    color: "white",
                    fontSize: "25px",
                    padding: "0px 20px",
                  }}
                >
                  Log In
                </p>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Welcome;
