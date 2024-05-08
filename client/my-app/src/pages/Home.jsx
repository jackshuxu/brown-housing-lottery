import React, { useState } from "react";
import Header from "../components/Header";
import "../components/Home.css";
import RoomBox from "../components/RoomBox.jsx";
import Footer from "../components/Footer.jsx";
import { fetchAPISearch } from "../components/ServerHandler.tsx";

export default function Home() {
  const [availability, setAvailability] = useState(""); // State to hold the availability value
  const [building, setBuilding] = useState(""); // State to hold the building value
  const [roomType, setRoomType] = useState("any"); // State to hold the room type value
  const [filteredData, setFilteredData] = useState([]); // State to hold the filtered data

  const handleFilterClick = async () => {
    try {
      // Fetch data from the server based on the input values
      const data = await fetchAPISearch(availability, building, roomType);

      // Update the state with the filtered data
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
        <input
          className="options"
          type="Availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        />
        <h3> Room type:</h3>
        <select
          className="options"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        >
          <option value="any">Any</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="triple">Triple</option>
          <option value="suite">Suite</option>
        </select>
        <h3> Building:</h3>
        <input
          className="options"
          type="Building"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
        />
        {/* Filter button to trigger the data fetching */}
        <button onClick={handleFilterClick}>Filter</button>
        {/* Display the filtered data */}
        <div>
          <h2>Filtered Data</h2>
          <ul>
            {filteredData.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <RoomBox />
      <RoomBox />
      <RoomBox />
      <Footer />
    </>
  );
}
