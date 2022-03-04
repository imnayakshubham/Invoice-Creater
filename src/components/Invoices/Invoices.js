import { Container } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { db } from "../../firebaseconfig/firebase";
import { AuthContext } from "./../../context/AuthContext";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);

  const { user } = useContext(AuthContext);

  const getInvoices = async () => {
    const docs = await db
      .collection("invoices")
      .where("user", "==", user.uid)
      .get();

    const dbInvoices = [];

    docs.forEach((doc) => {
      dbInvoices.push(doc.data());
    });

    setInvoices(dbInvoices);
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return <div></div>;
}
