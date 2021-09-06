import React, { useContext, useState } from "react";
import "./Header.css";
import firebase from "firebase";

// import MenuIcon from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebaseconfig/firebase";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const currentUser = useContext(AuthContext).user;
  const [loggedout, setloggedout] = useState(false);
  const history = useHistory();

  return (
    <div>
      <div className="header">
        <div className="headerleft">
          {currentUser ? (
            <Link to="/invoices">
              <h1>Invoice Creater</h1>
            </Link>
          ) : (
            <Link to="/">
              <h1>Invoice Creater</h1>
            </Link>
          )}
        </div>
        <div className="headerright">
          {/* <MenuIcon> */}
          {currentUser ? (
            <div>
              <button
                style={{ backgroundColor: "red", borderRadius: "15px" }}
                onClick={() => {
                  auth.signOut();
                  setloggedout(true);
                  localStorage.removeItem("invoiceappuserinfo");
                  history.push("/");
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                auth.signInWithPopup(provider);
              }}
            >
              SIGN IN WITH GOOGLE
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
