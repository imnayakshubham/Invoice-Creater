import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
import "./ViewInvoice.css";
import CreateInvoice from "../CreateInvoice/CreateInvoice";
import Modal from "../Modal/Modal";
import { db } from "../../firebaseconfig/firebase";
// import CreateInvoice from "../CreateInvoice/CreateInvoice";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    color: "#fff",
    border: "50px solid #000",
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2, 4, 3),
    width: "400px",
    height: "100%",
    position: "absolute",
    margin: "0 1rem 0 1rem",
  },
  root: {
    minWidth: 275,
    border: "1px solid gray",
    borderRadius: "5px",
    color: "#fff",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    display: "flex",
    fontSize: 14,
    justifyContent: "space-between",
  },
  pos: {
    marginBottom: 12,
  },
}));

function ViewInvoice() {
  const [invoices, setinvoices] = useState([]);
  const getinvoices = async () => {
    await db
      .collection("invoices")
      .orderBy("timestamp", "desc")
      .onSnapshot(function (querying) {
        setinvoices(
          querying?.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  };
  useEffect(() => {
    getinvoices();
  }, []);
  const classes = useStyles();
  const [isopen, setisopen] = useState(false);
  const handleclose = () => {
    setisopen(false);
  };

  return (
    <>
      <div
        className="options"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="filteroptions"></div>
        <div className="createoptions">
          <Button
            onClick={() => {
              setisopen(true);
            }}
          >
            Create Invoice
          </Button>
        </div>
      </div>
      {invoices?.map((invoice, id) => (
        <div key={invoice.id}>
          <div className="viewinvoicecard">
            <Card className={classes.root}>
              <CardContent className={classes.title}>
                <Typography variant="h5" component="h2">
                  Name
                  <br />
                  {invoice.data.clientname}
                  {/* <h2> </h2> */}
                </Typography>
                <Typography variant="h5" component="h2">
                  Status
                  <br />
                  {invoice.data.status}
                </Typography>
                <Typography variant="h5" component="h2">
                  Amount <br />
                  {invoice.data.totalamount}
                </Typography>
                <Typography variant="h5" component="h2">
                  Due Date <br />
                  {Date(invoice.data.timestamp.nanoseconds)
                    .toString()
                    .substring(0, 15)}
                </Typography>
                <CardActions>
                  <Button size="small">
                    <Link to={`/invoice/${invoice.id}`}>View Invoice</Link>
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}

      <Modal open={isopen} close={handleclose}>
        <CreateInvoice />
      </Modal>
    </>
  );
}

export default ViewInvoice;
