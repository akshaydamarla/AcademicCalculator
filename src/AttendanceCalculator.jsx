import React, { useState } from "react";
import "./AttendanceCalculator.css";

const AttendanceCalculator = ({ goHome }) => {
  const [attendance, setAttendance] = useState({
    lectureAttended: "",
    lectureTotal: "",
    tutorialAttended: "",
    tutorialTotal: "",
    practicalAttended: "",
    practicalTotal: "",
    skillAttended: "",
    skillTotal: "",
    lecturePercent: "",
    tutorialPercent: "",
    practicalPercent: "",
    skillPercent: "",
  });
  const [attendancePercentage, setAttendancePercentage] = useState(null);
  const [inputMode, setInputMode] = useState("counts"); // "counts" or "percentage"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendance((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleInputMode = () => {
    setInputMode((prevMode) => (prevMode === "counts" ? "percentage" : "counts"));
    setAttendancePercentage(null);
  };

  const calculateAttendance = () => {
    if (inputMode === "counts") {
      let totalAttended = 0;
      let totalClasses = 0;
      const categories = ["lecture", "tutorial", "practical", "skill"];
      categories.forEach((cat) => {
        const attended = parseFloat(attendance[`${cat}Attended`]);
        const total = parseFloat(attendance[`${cat}Total`]);
        if (!isNaN(attended) && !isNaN(total)) {
          totalAttended += attended;
          totalClasses += total;
        }
      });
      if (totalClasses > 0) {
        setAttendancePercentage(((totalAttended / totalClasses) * 100).toFixed(2));
      } else {
        setAttendancePercentage("Invalid Input");
      }
    } else {
      // Calculate average of percentages
      const categories = ["lecture", "tutorial", "practical", "skill"];
      let totalPercent = 0;
      let count = 0;
      categories.forEach((cat) => {
        const percent = parseFloat(attendance[`${cat}Percent`]);
        if (!isNaN(percent)) {
          totalPercent += percent;
          count++;
        }
      });
      if (count > 0) {
        setAttendancePercentage((totalPercent / count).toFixed(2));
      } else {
        setAttendancePercentage("Invalid Input");
      }
    }
  };

  return (
    <div className="page-container attendance-page">
      <h1>Attendance Calculator</h1>
      <div className="toggle-section">
        <label className="toggle-label">Input Mode:</label>
        <button
          className="toggle-btn"
          onClick={toggleInputMode}
        >
          {inputMode === "counts" ? "Switch to Percentage Mode" : "Switch to Attended/Total Mode"}
        </button>
      </div>

      <div className="attendance-grid">
        {["lecture", "tutorial", "practical", "skill"].map((type) => (
          <div key={type} className="attendance-card">
            <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
            <div className="attendance-inputs">
              {inputMode === "counts" ? (
                <>
                  <label>
                    Attended:
                    <input
                      type="number"
                      name={`${type}Attended`}
                      value={attendance[`${type}Attended`]}
                      onChange={handleChange}
                      min="0"
                    />
                  </label>
                  <label>
                    Total:
                    <input
                      type="number"
                      name={`${type}Total`}
                      value={attendance[`${type}Total`]}
                      onChange={handleChange}
                      min="0"
                    />
                  </label>
                </>
              ) : (
                <label>
                  Attendance Percentage:
                  <input
                    type="number"
                    name={`${type}Percent`}
                    value={attendance[`${type}Percent`]}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </label>
              )}
            </div>
          </div>
        ))}
      </div>

      <button onClick={calculateAttendance}>Calculate Attendance</button>
      {attendancePercentage && (
        <div className="result">
          Attendance Percentage: {attendancePercentage}
          {attendancePercentage !== "Invalid Input" ? "%" : ""}
        </div>
      )}
      <button className="btn" onClick={goHome}>
        Back to Home
      </button>
    </div>
  );
};

export default AttendanceCalculator;