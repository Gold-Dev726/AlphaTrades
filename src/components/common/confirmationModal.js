import React from "react";
import Button from "../common/Button";

const ConfirmationModal = (props) => {
  return (
    <div className="confirm-box open">
      <div className="inner-modal">
        <p>{props.title}</p>
        <div className="conf-footer text-right">
          <Button className="gray-btn" onClick={props.cancelEvent}>
            {props.cancelText}
          </Button>
          <Button
            className="blue-btn"
            onClick={() => {
              props.confirmEvent();
            }}
          >
            {props.confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
