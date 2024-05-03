import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
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
        </ul>
      </nav>
    </header>
  );
}
