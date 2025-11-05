import { useState } from "react";
import "./index.css";
import "./app.css";
import CGPACalculator from "./CGPACalculator.jsx";
import AttendanceCalculator from "./AttendanceCalculator.jsx";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderContent = () => {
    switch (currentPage) {
      case "cgpa":
        return <CGPACalculator goHome={() => setCurrentPage("home")} />;
      case "attendance":
        return <AttendanceCalculator goHome={() => setCurrentPage("home")} />;
      default:
        return (
          <div className="home-container">
            <div className="home-content">
              <h1>Welcome to Academic Tools</h1>
              <p>Select a calculator to begin:</p>
              <div className="home-buttons">
                <button className="btn" onClick={() => setCurrentPage("cgpa")}>
                  Calculate CGPA
                </button>
                <button className="btn" onClick={() => setCurrentPage("attendance")}>
                  Calculate Attendance
                </button>
              </div>
            </div>
            <div className="thankyou-section">
              <h2>Thanks for visiting my page!</h2>
              <p>Your support motivates me to build more useful academic tools. 😊</p>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <header className="app-header">
        <h2>Academic Tools</h2>
        <nav className="nav-links">
          <div className="dropdown">
            <button className="dropbtn">Calculators ▾</button>
            <div className="dropdown-content">
              <button onClick={() => setCurrentPage("cgpa")}>CGPA Calculator</button>
              <button onClick={() => setCurrentPage("attendance")}>Attendance Calculator</button>
            </div>
          </div>
          <button onClick={() => window.open("https://github.com/akshaydamarla", "_blank")}>
            GitHub
          </button>
          <button onClick={() => window.open("https://www.linkedin.com/in/damarla-akshay-naga-sai-kalyan-96b60a366/", "_blank")}>
            LinkedIn
          </button>
          <button onClick={() => window.open("mailto:akshaydamarla@example.com")}>Contact</button>
        </nav>
      </header>

      <main>{renderContent()}</main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Academic Tools by{" "}
          <strong>Akshay Damarla 2400030175</strong>. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}

export default App;