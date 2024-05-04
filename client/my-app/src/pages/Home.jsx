import React from "react";
import Header from "../components/Header";
import "../components/Home.css";
import RoomBox from "../components/RoomBox.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <>
      <Header />
      <div className="banner">
        <span className="banner-text">
          Meet your new ฅ՞•ﻌ•՞ฅ bear home!˚ ༘ ೀ⋆｡˚{" "}
        </span>
      </div>
      <div className="filter-banner">
        <h1>Filter rooms: </h1>
        <h3> Availability:</h3>
        <input className="options" type="Availability" />
        <h3> Room type:</h3>
        <select className="options">
          <option value="any">Any</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="double">Triple</option>
          <option value="double">Suite</option>
        </select>
        <h3> Building:</h3>
        <input className="options" type="Building" />
        <button>filter</button>
      </div>
      <RoomBox />
      <RoomBox />
      <RoomBox />
      <Footer />
    </>
  );
}
