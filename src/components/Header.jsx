import React, {useState} from "react";
import { Link } from "react-router-dom";

const Header = ({fix}) => {
  return (
    <div className={fix ? "head fixed" : "head"}>
      <Link to="/" className="logo link">
        <img src={process.env.PUBLIC_URL + "/logo.png"} />
      </Link>
      <div className="nav">
        <Link to="/qa" className="nav-item link">
          Collection
        </Link>
        <Link to="" className="nav-item link">
          Data
        </Link>
        <Link to="" className="nav-item link">
          API
        </Link>
        <Link to="" className="nav-item link">
          About
        </Link>
        <Link to="" className="nav-item link">
          Contact
        </Link>
      </div>
      <div className="other-nav">
        <Link to="/login" className="btn-sign-in link">
          Sign in
        </Link>
        <Link to="/register" className="btn-sign-up link">
          Try it out
        </Link>
      </div>
    </div>
  );
};

export default Header;
