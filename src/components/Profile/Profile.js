import React, { useState, useContext } from "react";
import { Container, TextField, Button } from "@mui/material";
import { AuthContext } from "./../../context/AuthContext";
import { makeStyles } from "@mui/styles";
import { db } from "../../firebaseconfig/firebase";

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

  const handleSubmit = async (e) => {
    console.warn(user.uid);
    e.preventDefault();
    const res = await db.collection(user.uid).add({
      profile: {
        name,
        address,
        mob,
        since,
        t_and_c: tc,
        user: user.uid,
      },
    });
    console.log(res, "res");
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
          variant="filled"
        />
        <TextField
          onChange={(e) => setAddress(e.target.value)}
          className={classes.field}
          id="filled-basic"
          label="Store Address"
          variant="filled"
        />
        <TextField
          onChange={(e) => setMob(e.target.value)}
          className={classes.field}
          id="filled-basic"
          label="Mobile No."
          variant="filled"
        />
        <TextField
          onChange={(e) => setSince(e.target.value)}
          className={classes.field}
          id="filled-basic"
          label="Since."
          variant="filled"
        />
        <TextField
          onChange={(e) => setTc(e.target.value)}
          className={classes.field}
          id="filled-basic"
          label="Terms & Condition."
          variant="filled"
        />
      </div>
      <p onClick={handleSubmit}>create</p>
    </Container>
  );
}
