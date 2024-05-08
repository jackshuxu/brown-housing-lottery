import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../components/Home.css";
import RoomBox from "../components/RoomBox.jsx";
import Footer from "../components/Footer.jsx";
import {
  fetchAPISearch,
  fetchAPILoad,
  fetchAPIView,
} from "../components/ServerHandler.tsx";

export default function Home() {
  const [availability, setAvailability] = useState(""); // State to hold the availability value
  const [building, setBuilding] = useState(""); // State to hold the building value
  const [roomType, setRoomType] = useState("any"); // State to hold the room type value
  const [filteredData, setFilteredData] = useState([]); // State to hold the filtered data

  const handleViewClick = async () => {
    try {
      const data = await fetchAPIView();
      console.log("Filtered Data:", data); // Log the filtered data
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Load file data when the component mounts
  useEffect(() => {
    const loadFileData = async () => {
      try {
        // Fetch file data from the server
        await fetchAPILoad(
          "/Users/kseniiadolgopolova/Desktop/Browncoursework/CS0320/brown-housing-lottery/server/data/Sheet 2-Housing.csv"
        );
        console.log("File data loaded successfully.");
      } catch (error) {
        console.error("Error loading file data:", error);
      }
    };

    loadFileData(); // Call the function to load file data
  }, []);

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
        <button onClick={handleViewClick}>View</button>
        <button>Filter</button>
        {/* Display the filtered data */}
        <div dangerouslySetInnerHTML={{ __html: filteredData }}></div>
      </div>
      <RoomBox />
      <RoomBox />
      <RoomBox />
      <Footer />
    </>
  );
}
