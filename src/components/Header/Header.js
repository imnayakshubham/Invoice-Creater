import React, { useContext, useState } from "react";
import "./Header.css";
import firebase from "firebase";

// import MenuIcon from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebaseconfig/firebase";
import { AuthContext } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Avatar from "@mui/material/Avatar";
import { handleLogin } from "../Welcome/Welcome";

function Header() {
  const provider = new firebase.auth.GoogleAuthProvider();
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth.signOut();
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleProfile = () => {
    history.push("/profile");
  };

  const handleInvoices = () => {
    history.push("/invoices");
  };

  return (
    <div className="header">
      <div>
        <Link to="/">
          <h1 className="logoText">Invoicer</h1>
        </Link>
      </div>
      <div>
        {user ? (
          <div>
            <Button
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar alt="Remy Sharp" src="" />
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "5px 20px",
                }}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleInvoices}>Invoices</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </div>
            </Menu>
          </div>
        ) : (
          <div onClick={handleLogin}>
            <Button className="loginBtn">
              <p style={{ color: "white" }}>Log In</p>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
