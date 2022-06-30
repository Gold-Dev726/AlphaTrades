import React from "react";

const CloseIcon = ({closeToast}) => (
  <button className="cross-btn" onClick={closeToast}>
    <i className="icon-close-image"></i>
  </button>
);

export default CloseIcon;