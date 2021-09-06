import { Button } from "@material-ui/core";
import React from "react";
import "./Modal.css";

function Modal({ open, children, close }) {
  if (!open) return null;
  return (
    <div>
      <div className="blank" />
      <div className="modalcontainer">
        <div className="closemodal">
          <Button onClick={close}> ❌ </Button>
        </div>
        <div className="modalcontent">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
