import { useState } from "react";
import { useNavigate } from "react-router-dom";

const users = {
  BCA: "bcapass",
  BScCS: "cspass",
  BScCM: "cmpass",
};

export default function Login() {
  const [dept, setDept] = useState("BCA");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (users[dept] === password) {
      localStorage.setItem("dept", dept);
      navigate("/form");
    } else {
      alert("Invalid password!");
    }
  };

  return (
    <div className="container">
      <h1>Daksh Dept Login</h1>
      <label>Select Department</label>
      <select value={dept} onChange={(e) => setDept(e.target.value)}>
        <option>BCA</option>
        <option>BScCS</option>
        <option>BScCM</option>
      </select>

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
