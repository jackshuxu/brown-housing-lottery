import Header from "../components/Header";
import "../components/About.css";
import bluenoImage from "../photos/blueno.jpg"
import Footer from "../components/Footer.jsx";

export default function About() {
  return (
    <>
      <Header />
      <div className="banner">
        <span className="banner-text">About Us!˚ ༘ ೀ⋆｡˚ </span>
      </div>
      <div className="content-wrapper">
        <div className="image-container">
          <img
            src={bluenoImage}
            style={{
              position: "relative",
              top: 0,
              left: "50%",
              width: "40%",
              height: "40%",
              opacity: 1,
            }}
          />
        </div>
        <div className="bear-home-text">
          <h2>Welcome to Bear Home!</h2>
          <p>
            {" "}
            Bear Home helps Brown University students find available rooms
            during the housing selection process. This website is updated
            regularly and contains the latest selection of available rooms. You
            can filter for rooms based on your desired dorm building and room
            type, so you'll know exactly which room to choose when your time
            slot comes!{" "}
          </p>
          <p>
            This website was created by Brown University students as part of a final project for "CS0320:
            Introduction to Software Engineering".
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
