import "./App.css";
import SignInSide from "./SignInSide";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NoPage from "./pages/NoPage";
import React, { useContext } from "react";

export default function App() {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <div>
      <BrowserRouter>
        {isSignedIn ? (
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        ) : (
          <SignInSide />
        )}
      </BrowserRouter>
    </div>
  );
}
