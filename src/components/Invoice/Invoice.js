import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../../firebaseconfig/firebase";
import "./Invoice.css";

function Invoice() {
  const [invoice, setInvoice] = useState([]);
  let { id } = useParams();
  const { inputFields } = invoice;
  const { totalamount } = invoice;

  useEffect(() => {
    db.collection("invoices")
      .doc(id)
      .get()
      .then((snapshot) => setInvoice(snapshot.data()));
  }, [id]);

  const printInvoice = () => {
    const ele = document.getElementsByClassName("header");
    const print = document.getElementById("printbtn");
    ele.style.display = "none";
    print.style.display = "none";

    window.print();
  };

  return (
    <>
      <div className="invoicedesigncontainer">
        <div className="companynamecontainer">
          <h1 className="companyname">Invoice Generator </h1>
        </div>
        <div className="userinfo">
          <h1 className="purpose">{/* {purpose} */}Invoice</h1>

          <div className="username">
            <span>Prepared for</span>
            <h1>
              {invoice.clientname || invoice.clientname}
              {/* {userName} */}
            </h1>
          </div>

          <div className="useraddress">
            <span>Address:</span>

            {<p> {invoice.clientaddress || invoice.clientaddress}</p>}
          </div>

          <div className="userotherinfo">
            <h1>📱 :{invoice.clientcontact}</h1>
          </div>
        </div>
        <div>
          <table>
            <tr>
              <th>Product/Desc</th>
              <th>
                Amount
                {/* ({currency}) */}
              </th>
              <th>Quantity {/* ({currency}) */}</th>
              <th>
                Subtotal
                {/* ({currency}) */}
              </th>
            </tr>
            {inputFields?.map((data, key) => (
              <tr key={data.id}>
                <td>{data?.productname || data.productname}</td>
                <td>X {data.amount}</td>
                <td>{data.quantity}</td>
                <td>{data.amount * data.quantity}</td>
              </tr>
            ))}
          </table>
        </div>

        <div className="result">
          <div className="amount">
            <h3>Total</h3>
            <h3>
              sumation
              <h4>{invoice.totalamount}</h4>
            </h3>
          </div>
          <div className="taxes">
            <h3>Tax</h3>
            <h3>{/* {tax}% */} 18%</h3>
          </div>
        </div>
        <div className="container">
          <div className="tccontainer">
            <h2>Terms and Conditions</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat
              atque debitis maxime dolores esse fuga
            </p>
          </div>
          <div className="pricecontainer">
            {invoice.status === "paid" ? (
              <h2 style={{ color: "green" }}>AMOUNT PAID</h2>
            ) : (
              <h2 style={{ color: "red" }}>AMOUNT DUE</h2>
            )}
            <h1>
              Rs
              {(Number(totalamount) * 18) / 100 + Number(totalamount)}
            </h1>
          </div>
        </div>
        <div className="ownerinfo">
          <div className="ownername">
            <span>Prepared by</span>
            <h1>{invoice.userInfo}</h1>
          </div>

          <div className="owneraddress">
            <span>Address:</span>
            <p>
              ownerAddress
              {/* {ownerAddress} */}
            </p>
          </div>

          <div className="ownerotherinfo">
            <h1>
              📱 :ownerContactInfo
              {/* {ownerContactInfo} */}
            </h1>
          </div>
          <h1 className="greet">Thank You!</h1>
        </div>

        <div className="btns">
          <button id="printbtn" onClick={printInvoice}>
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default Invoice;
