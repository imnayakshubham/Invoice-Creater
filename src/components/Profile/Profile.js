import React, { useState, useContext, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import { AuthContext } from "./../../context/AuthContext";
import { makeStyles } from "@mui/styles";
import { db } from "../../firebaseconfig/firebase";
import InputLabel from "@mui/material/InputLabel";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default function Profile({ history }) {
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mob, setMob] = useState("");
  const [since, setSince] = useState("");
  const [tc, setTc] = useState("");

  const setLocalData = (id) => {
    if (id) {
      localStorage.setItem(
        "profile",
        JSON.stringify({ name, address, mob, since, tc, id: id })
      );
    } else {
      localStorage.setItem(
        "profile",
        JSON.stringify({ name, address, mob, since, tc })
      );
    }
  };

  const setStates = (profile) => {
    setAddress(profile?.address);
    setMob(profile?.mob);
    setSince(profile?.since);
    setTc(profile?.tc);
    setName(profile?.name);
  };

  useEffect(() => {
    let profile = localStorage.getItem("profile");
    if (profile) {
      setStates(JSON.parse(profile));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const path = `profiles`;
    let res;
    let profile = localStorage.getItem("profile");
    profile = JSON.parse(profile);

    if (profile) {
      res = await db.collection(path).doc(profile?.id).set({
        name,
        address,
        mob,
        since,
        t_and_c: tc,
        user: user.uid,
      });
      setLocalData();
    } else {
      res = await db.collection(path).add({
        name,
        address,
        mob,
        since,
        t_and_c: tc,
        user: user.uid,
      });
      setLocalData(res.id);
    }
  };

  return (
    <Container fixed style={{ marginTop: 10, maxWidth: "700px" }}>
      {/* <Button variant="contained" component="label">
        Upload Store Logo
        <input type="file" hidden />
      </Button> */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          onChange={(e) => setName(e.target.value)}
          className={classes.field}
          id="filled-basic"
          label="Store Name"
          // variant="filled"
          value={name}
          // label="name"
          color="secondary"
          focused
        />
        <TextField
          onChange={(e) => setAddress(e.target.value)}
          className={classes.field}
          id="filled-basic"
          value={address}
          label="Store Address"
          color="secondary"
          focused
        />
        <TextField
          onChange={(e) => setMob(e.target.value)}
          className={classes.field}
          id="filled-basic"
          value={mob}
          label="Mobile"
          color="secondary"
          focused
        />
        <TextField
          onChange={(e) => setSince(e.target.value)}
          className={classes.field}
          id="filled-basic"
          label="Since."
          value={since}
          color="secondary"
          focused
        />
        <TextField
          onChange={(e) => setTc(e.target.value)}
          className={classes.field}
          id="filled-basic"
          label="Terms & Condition."
          value={tc}
          color="secondary"
          focused
        />
      </div>
      <p onClick={handleSubmit}>create</p>
    </Container>
  );
}
