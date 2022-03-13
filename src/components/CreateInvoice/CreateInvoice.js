import { Button } from "@material-ui/core";
import React from "react";
import "./CreateInvoice.css";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { db } from "../../firebaseconfig/firebase";
import firebase from "firebase";
import { AuthContext } from "./../../context/AuthContext";
import { useContext } from "react";

function CreateInvoice() {
  const { user } = useContext(AuthContext);

  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), productname: "", amount: 0, quantity: 0 },
  ]);
  const [clientname, setclientname] = useState("");
  const [clientcontact, setclientcontact] = useState("");
  const [clientaddress, setclientaddress] = useState("");
  const [duedate, setduedate] = useState(0);
  const [status, setstatus] = useState("unpaid");
  const [error, setError] = useState("");
  let totalamount = 0;
  const userInfo = user.id;

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), productname: "", amount: 0, quantity: 0 },
    ]);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields?.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setInputFields(newInputFields);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  const handleoptions = (e) => {
    if (e.target.value === "paid") {
      setstatus("paid");
    } else {
      setstatus("unpaid");
    }
  };
  inputFields?.map((data, id) => {
    totalamount = data.amount * data.quantity + totalamount;
    return totalamount;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !clientname ||
      !clientcontact ||
      !clientaddress ||
      !inputFields ||
      !status ||
      !userInfo
    ) {
    }
    try {
      await db.collection("invoices").add({
        clientname,
        clientcontact,
        clientaddress,
        inputFields,
        status,
        duedate,
        userInfo,
        totalamount,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setclientname("");
      setclientcontact("");
      setclientaddress("");
      setstatus("unpaid");
      setduedate(0);
      setInputFields([
        { id: uuidv4(), productname: "", amount: 0, quantity: 0 },
      ]);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="formcontainer">
      <form id="invoiceform">
        <div className="clientinfo">
          <input
            className="clientname"
            placeholder="Client/Customer Name"
            required
            type="text"
            value={clientname}
            onChange={(e) =>
              setclientname(e.target.value.substr(0, 1).toUpperCase())
            }
          />
          <input
            className="clientcontact"
            placeholder="Client/Customer Number"
            required
            type="Number"
            value={clientcontact}
            onChange={(e) => setclientcontact(e.target.value)}
          />
          <input
            className="clientaddress"
            placeholder="Client/Customer Address"
            required
            type="text"
            value={clientaddress}
            onChange={(e) => setclientaddress(e.target.value)}
          />
        </div>
        {inputFields.map((inputField) => (
          <div className="productinfo" key={inputField.id}>
            <input
              name="productname"
              className="productname"
              placeholder="Product Name"
              required
              type="text"
              onChange={(event) => handleChangeInput(inputField.id, event)}
            />
            <input
              name="amount"
              className="Amount"
              placeholder="Amount"
              required
              type="Number"
              onChange={(event) => handleChangeInput(inputField.id, event)}
            />
            <input
              name="quantity"
              className="quantity"
              placeholder="Quantity"
              required
              type="Number"
              onChange={(event) => handleChangeInput(inputField.id, event)}
            />
            <Button
              disabled={inputFields.length === 1}
              onClick={() => handleRemoveFields(inputField.id)}
            >
              <DeleteIcon />
            </Button>
          </div>
        ))}
        <Button onClick={handleAddFields}>
          <AddIcon />
        </Button>
        <label>
          Payment Status :
          <select defaultValue="unpaid" onChange={handleoptions}>
            <option value="unpaid">Un Paid</option>
            <option value="paid">Paid</option>
          </select>
        </label>

        {status === "unpaid" ? (
          <div>
            <input
              name="duedate"
              className="duedate"
              placeholder="Enter Due date in days"
              type="Number"
              onChange={(event) => {
                if (status === "unpaid") {
                  setduedate(event.target.value);
                } else {
                  setduedate(duedate);
                }
              }}
              required
            />
          </div>
        ) : (
          ""
        )}
        <div className="create">
          <Button onClick={handleSubmit}>Create</Button>
        </div>
      </form>
    </div>
  );
}

export default CreateInvoice;
