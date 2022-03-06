import { Container, Typography } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { db } from "../../firebaseconfig/firebase";
import { AuthContext } from "./../../context/AuthContext";
import { Card } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, CircularProgress } from "@mui/material";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@material-ui/icons/Delete";
import firebase from "firebase";
import "./Invoices.css";
import { AddIcon } from "@material-ui/icons/Add";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function Invoices() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

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

  console.log("invoices", invoices);

  const columns = [
    { field: "id", headerName: "ID", width: "400px" },
    { field: "customerName", headerName: "Customer Name", width: "400px" },
    { field: "createdOn", headerName: "Created On", width: "400px" },
    { field: "createdOn", headerName: "Created On", width: "400px" },
    { field: "lastName", headerName: "Last name", width: "400px" },
  ];

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), productname: "", amount: 0, quantity: 0 },
    ]);
  };

  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), productName: "", amount: 0, quantity: 0 },
  ]);
  const [clientName, setClientName] = useState("");
  const [clientNum, setClientNum] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  const handleChangeInput = (id, event, label) => {
    const newInputFields = inputFields?.map((i) => {
      console.warn(event.target.name);
      if (id === i.id) {
        i[label] = event.target.value;
      }
      return i;
    });
    setInputFields(newInputFields);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const res = await db.collection("invoices").add({
      clientName,
      clientAddress,
      clientNum,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.uid,
      products: inputFields,
    });

    console.log("res", res.docs);
    getInvoices();
    setLoading(false);
    closeModal();
  };

  return (
    <Card
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Button onClick={openModal}>Create Invoice 📄 </Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Container>
          <div style={{ textAlign: "center", marginBottom: 15, marginTop: 15 }}>
            <Typography mt={10} component="h3" variant="h6">
              Create Invoice 📄
            </Typography>
          </div>
          <TextField
            id="demo-helper-text-aligned"
            label="Client/Customer Name"
            onChange={(e) => setClientName(e.target.value)}
            className={"textField"}
          />
          <TextField
            id="demo-helper-text-aligned"
            label="Client/Customer Number"
            onChange={(e) => setClientNum(e.target.value)}
            className={"textField"}
          />
          <TextField
            id="demo-helper-text-aligned"
            label="Client/Customer Address"
            onChange={(e) => setClientAddress(e.target.value)}
            className={"textField"}
          />
          <div>
            {inputFields.map((inputField) => (
              <div style={{ marginTop: 10 }}>
                <TextField
                  id="demo-helper-text-aligned"
                  label="Product Name"
                  onChange={(event) =>
                    handleChangeInput(inputField.id, event, "productName")
                  }
                  className={"textField"}
                />

                <TextField
                  id="demo-helper-text-aligned"
                  label="Amount"
                  type="number"
                  inputProps={{ min: 0 }}
                  onChange={(event) =>
                    handleChangeInput(inputField.id, event, "amount")
                  }
                  className={"textField"}
                />
                <TextField
                  // id="outlined-number"
                  id="demo-helper-text-aligned"
                  label="Quantity"
                  type="number"
                  inputProps={{ min: 0 }}
                  InputLabelProps={{
                    shrink: true,
                    min: 0,
                  }}
                  onChange={(event) =>
                    handleChangeInput(inputField.id, event, "quantity")
                  }
                  className={"textField"}
                />

                <Button
                  disabled={inputFields.length === 1}
                  onClick={() => handleRemoveFields(inputField.id)}
                >
                  <DeleteIcon />
                </Button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button onClick={handleAddFields}> Add Product </Button>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleSubmit}>
              {loading ? (
                <CircularProgress size={20} color="secondary" />
              ) : (
                <p>Create 👍</p>
              )}
            </Button>
          </div>
        </Container>
      </Modal>
      <div style={{ height: 400, width: "1200px" }}>
        {/* <DataGrid
          rows={[
            { id: 1, customerName: "Snow", lastName: "Jon", createdOn: 35 },
            {
              id: 2,
              customerName: "Lannister",
              lastName: "Cersei",
              createdOn: 42,
            },
            {
              id: 3,
              customerName: "Lannister",
              lastName: "Jaime",
              createdOn: 45,
            },
            { id: 4, customerName: "Stark", lastName: "Arya", createdOn: 16 },
            {
              id: 5,
              customerName: "Targaryen",
              lastName: "Daenerys",
              createdOn: null,
            },
            {
              id: 6,
              customerName: "Melisandre",
              lastName: null,
              createdOn: 150,
            },
            {
              id: 7,
              customerName: "Clifford",
              lastName: "Ferrara",
              createdOn: 44,
            },
          ]}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        /> */}
      </div>
    </Card>
  );
}
