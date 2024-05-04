import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./Header.css";

export default function Header() {
  const { logOut } = UserAuth();

  const handleSignOut = () => {
    logOut();
  };

  return (
    <header>
      <h1> Bear Home (^з^)-☆ </h1>
      <nav>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
          <li>
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
