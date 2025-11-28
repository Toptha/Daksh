import { useState } from "react";
import { useNavigate } from "react-router-dom";
import departmentsData from "../assets/departments.json"; // relative path

export default function Login() {
  const deptEntries = Object.entries(departmentsData);
  const [selectedDeptId, setSelectedDeptId] = useState(deptEntries[0]?.[0] ?? "");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!selectedDeptId) {
      alert("Please select a department.");
      return;
    }

    const deptInfo = departmentsData[selectedDeptId];
    if (!deptInfo) {
      alert("Selected department not found.");
      return;
    }

    if (password === deptInfo.password) {
      localStorage.setItem("deptId", selectedDeptId);
      localStorage.setItem("deptLabel", deptInfo.label);
      navigate("/form");
    } else {
      alert("Invalid password for the selected department!");
    }
  };

  return (
    <div className="container daksh-login-card">
      <h1 className="daksh-title">Daksh Dept Login</h1>

      <label className="field-label">Select Department</label>
      <select
        value={selectedDeptId}
        onChange={(e) => setSelectedDeptId(e.target.value)}
        className="daksh-select"
      >
        {deptEntries.map(([id, info]) => (
          <option key={id} value={id}>
            {info.label}
          </option>
        ))}
      </select>

      <label className="field-label">Password</label>
      <input
        className="daksh-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />

      <button className="daksh-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
