import React from "react";

function SuccessBox({ children }) {
  return (
    <div>
      <div className="successBox">{children}</div>
    </div>
  );
}

export default SuccessBox;
