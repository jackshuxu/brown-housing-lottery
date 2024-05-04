import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function Header() {
  const { logOut } = UserAuth();

  const handleSignOut = () => {
    logOut();
  };

  return (
    <header>
      <h1> HOUSING LOTTERY (^з^)-☆ ( ͡° ͜ʖ ͡°) ( ˘ ³˘)♥ (* ^ ω ^) (.❛ ᴗ ❛.) </h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/data">Data</Link>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              style={{
                border: "none",
                background: "none",
                color: "blue",
                cursor: "pointer",
              }}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
