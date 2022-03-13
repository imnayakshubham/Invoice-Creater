import { Container, Typography } from "@material-ui/core";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { db } from "../../firebaseconfig/firebase";
import { AuthContext } from "./../../context/AuthContext";
import { Card } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, CircularProgress } from "@mui/material";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";
import firebase from "firebase";
import "./Invoices.css";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
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

  const getInvoices = useCallback(async () => {
    const docs = await db
      .collection("invoices")
      .where("user", "==", user.uid)
      .get();
    const dbInvoices = [];

    docs.forEach((doc) => {
      dbInvoices.push(doc.data());
    });

    setInvoices(dbInvoices);
  }, [user.uid]);

  useEffect(() => {
    getInvoices();
  }, [getInvoices]);

  console.log("invoices", invoices);

  const columns = [
    {
      field: "clientName",
      headerName: "Customer Name",

      flex: 1,
      minWidth: 150,
    },
    {
      field: "timestamp",
      headerName: "Created On",
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => {
        console.log(row);
        return <div>{row?.timestamp?.toDate().toDateString()}</div>;
      },
    },
    {
      field: "clientNum",
      headerName: "Client Contact Number",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      minWidth: 150,
      renderCell: ({ row }) => {
        let totalamount = 0;
        return (
          <div>
            {row?.products?.map((data, id) => {
              totalamount = data.amount * data.quantity + totalamount;
              return totalamount;
            })}
          </div>
        );
      },
    },
    {
      field: "",
      headerName: "Actions",
      flex: 1,
      sortable: "false",
      minWidth: 150,
      renderCell: ({ row }) => {
        return (
          <Button type="link">
            View Invoice
          </Button>
        );
      },
    }
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
      id: uuidv4(),
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "end", margin: "0.75rem 9rem" }}
      >
        <Button onClick={openModal}>Create Invoice 📄 </Button>
      </div>
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
            <Button onClick={handleAddFields} startIcon={<AddIcon />}>
              {" "}
              Add Product{" "}
            </Button>
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
      <div style={{ margin: "0 150px 0 150px" }}>
        <div style={{ height: 400, justifyContent: "center" }}>
          <DataGrid
            rows={invoices}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
}
