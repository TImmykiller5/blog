import React from "react";

function SubmitButton({action, loading}) {
  return (
    <button className="" style={{ backgroundColor: "#6EEB83" }} type="submit">
      {loading ? <>hi</>:action}

    </button>
  );
}

export default SubmitButton;
