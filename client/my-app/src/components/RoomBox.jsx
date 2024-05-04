import React from "react";
import "./RoomBox.css";

function RoomBox({ header, children }) {
  return (
    <div className="box">
      <h2>{header}</h2>
      <div className="content">{children}</div>
    </div>
  );
}

export default function RoomBoxDisplay() {
  return (
    <div className="box-container">
      <RoomBox header="Vartan Gregorian Quad A Rm 401">
        <p> Availability: Taken! </p>
        <p> Room type: Double </p>
        <p> Building: VGQ </p>
      </RoomBox>
      <RoomBox header="Vartan Gregorian Quad A Rm 401">
        <p> Availability: Taken! </p>
        <p> Room type: Double </p>
        <p> Building: VGQ </p>
      </RoomBox>
      <RoomBox header="Vartan Gregorian Quad A Rm 401">
        <p> Availability: Taken! </p>
        <p> Room type: Double </p>
        <p> Building: VGQ </p>
      </RoomBox>
    </div>
  );
}
