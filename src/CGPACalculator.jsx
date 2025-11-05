import React, { useState } from "react";
import "./CGPACalculator.css";

function CGPACalculator({ goHome }) {
  const [prevCgpa, setPrevCgpa] = useState("");
  const [prevCredits, setPrevCredits] = useState("");
  const [numSubjects, setNumSubjects] = useState(5);
  const [subjects, setSubjects] = useState(
    Array(5).fill({ grade: "", credits: "" })
  );
  const [sgpa, setSgpa] = useState(null);
  const [combinedCgpa, setCombinedCgpa] = useState(null);

  const handleNumSubjectsChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    setNumSubjects(count);
    setSubjects((prev) => {
      const newSubjects = [...prev];
      if (count > newSubjects.length) {
        for (let i = newSubjects.length; i < count; i++) {
          newSubjects.push({ grade: "", credits: "" });
        }
      } else {
        newSubjects.length = count;
      }
      return newSubjects;
    });
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setSubjects(newSubjects);
  };

  const calculateSGPA = () => {
    let totalCredits = 0;
    let weightedSum = 0;

    subjects.forEach((sub) => {
      const grade = parseFloat(sub.grade);
      const credits = parseFloat(sub.credits);
      if (!isNaN(grade) && !isNaN(credits)) {
        weightedSum += grade * credits;
        totalCredits += credits;
      }
    });

    if (totalCredits > 0) {
      const termSgpa = (weightedSum / totalCredits).toFixed(2);
      setSgpa(termSgpa);

      if (
        prevCgpa !== "" &&
        prevCredits !== "" &&
        !isNaN(parseFloat(prevCgpa)) &&
        !isNaN(parseFloat(prevCredits))
      ) {
        const combined = (
          (parseFloat(prevCgpa) * parseFloat(prevCredits) + weightedSum) /
          (parseFloat(prevCredits) + totalCredits)
        ).toFixed(2);
        setCombinedCgpa(combined);
      } else {
        setCombinedCgpa(null);
      }
    } else {
      setSgpa("Invalid Input");
      setCombinedCgpa(null);
    }
  };

  return (
    <div className="page-container cgpa-page">
      <h1>CGPA Calculator</h1>
      <label>
        Previous CGPA:
        <input
          type="number"
          step="0.01"
          min="0"
          max="10"
          value={prevCgpa}
          onChange={(e) => setPrevCgpa(e.target.value)}
        />
      </label>
      <label>
        Previous Total Credits:
        <input
          type="number"
          min="0"
          value={prevCredits}
          onChange={(e) => setPrevCredits(e.target.value)}
        />
      </label>
      <label>
        Number of Subjects:
        <input
          type="number"
          value={numSubjects}
          onChange={handleNumSubjectsChange}
          min="0"
        />
      </label>

      {subjects.map((sub, i) => (
        <div key={i} className="subject-card">
          <h3>Subject #{i + 1}</h3>
          <div className="subject-grid">
            <label>
              Grade
              <input
                type="number"
                value={sub.grade}
                onChange={(e) =>
                  handleSubjectChange(i, "grade", e.target.value)
                }
                min="0"
                max="10"
                step="0.1"
              />
            </label>
            <label>
              Credits
              <input
                type="number"
                value={sub.credits}
                onChange={(e) =>
                  handleSubjectChange(i, "credits", e.target.value)
                }
                min="1"
                step="0.5"
              />
            </label>
          </div>
        </div>
      ))}

      <button onClick={calculateSGPA}>Calculate SGPA</button>
      {sgpa !== null && <div className="result">Your SGPA: {sgpa}</div>}
      {combinedCgpa !== null && (
        <div className="result">Combined CGPA: {combinedCgpa}</div>
      )}
      <button className="btn" onClick={goHome}>
        Back to Home
      </button>
    </div>
  );
}

export default CGPACalculator;