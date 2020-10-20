import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SmhsLogo from "./img/Smhs_Logo.png";
import pointer from "./img/pointer.png";

function Splash() {
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return (
    <Link to="/login">
      <div className="splash_bg">
        <img src={SmhsLogo} alt="Motherson Group" className="splash-logo" />

        <div>
          <img
            alt="CLick"
            src={pointer}
            className="vert-move"
            style={{
              width: "2vw",
              color: "white",
            }}
          />
        </div>
      </div>
    </Link>
  );
}

export default Splash;
