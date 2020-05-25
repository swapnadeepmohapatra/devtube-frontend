import React from "react";

function Error({ err }) {
  return (
    <div>
      <div className="errorBox">Error: {err}</div>
    </div>
  );
}

export default Error;
