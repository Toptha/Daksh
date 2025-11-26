import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_PASSWORD = "adminpass";

const DEPARTMENTS = [
  "Bachelor of Business Administration (BBA) (Honours/ Honours with Research), School of Business and Management",
  "Bachelor of Business Administration (BBA)- Decision Science",
  "Bachelors of Business Administration (BBA) (Marketing and Tourism/Honours/Honours with Research)",
  "Bachelors of Business Administration (BBA) (Finance and International Business/ Honours/Honours with Research)",
  "BBA (Finance and Marketing Analytics), School of Business and Management BYC",
  "Bachelors of Business Administration (BBA) (Strategy and Business Analytics/Honours/Honours with Research)",
  "Bachelors of Business Administration (BBA) (Finance and Economics/Honours/Honours with Research)",
  "Master of Business Administration (MBA), School of Business and Management (PG)",
  "Master of Business Administration (MBA) - Executive, School of Business and Management (PG)",
  "BHM (Bachelor's of Hotel Management)",
  "Department of Commerce - UG",
  "Department of Commerce - PG",
  "Department of Professional Studies- UG",
  "Department of Professional Studies - PG",
  "Department of Media Studies (Undergraduate Programmes)",
  "Department of Media Studies (Postgraduate Programmes)",
  "MA English with Communication Studies",
  "Department of Performing Arts, Theatre Studies and Music",
  "School Of Psychological Sciences (Undergraduate)",
  "School of Psychological Sciences (PG)",
  "School Of Law ( UG & PG )BA LLB /BBA LLB (Honours) LLM (CAL/CCL/IPL)",
  "Kengeri Campus stall",
  "School of Architecture - UG",
  "School of Architecture - PG",
  "Department of Civil Engineering",
  "Department of Computer Science and Engineering",
  "Department of Artificial Intelligence, Machine Learning and Data Science",
  "Department of Mechanical and Automobile Engineering",
  "Center of Exellence",
  "Department of Electrical and Electronics Engineering",
  "Department of Electronics and Communication Engineering",
  "Department of International Studies, Political Science and History (PG)",
  "Department of International Studies, Political Science and History (UG)",
  "Pune Lavasa Campus",
  "Delhi-NCR Campus",
  "Department of Sociology",
  "Department of Social Work",
  "School of Education",
  "Office of Admissions",
  "Centre for Online Education",
  "Department of Computer Science - UG",
  "Department of Computer Science - PG",
  "Department of Statistics and Data Science - UG",
  "Department of Statistics and Data Science - PG",
  "Department of Life Sciences - UG",
  "Department of Life Sciences - PG",
  "Department of Physics & Electronics",
  "Department of Mathematics",
  "Department of Chemistry",
  "Centre for Academic and Professional Support - CAPS",
  "NEP SARATHI - Office of Registrar(Academics)",
  "Christ junior college",
  "Peer Education System",
  "Centre for Counselling and Health Services",
  "National Cadet Corps",
  "Department of Physical Education",
  "Student Welfare Office",
  "Centre for Service Learning",
  "Centre For Publications",
  "Vignette Windows",
  "Office of International Affairs",
  "Centre for Placement and Career Guidance",
  "Office of TCLS",
  "Christites for Climate Action (CCA)",
  "CHRIST Consultancy",
  "CHRIST Incubation Centre",
  "Office of Alumni Engagement",
  "Centre for Social Action (CSA)",
  "Sustainable Development Goals Cell",
  "Department of Economics (Undergraduate Programmes)",
  "Department of Economics (Postgraduate Programmes)",
  "B.Sc Psychology (Honours/Honours with Research)",
  "Department of Languages",
  "Bangalore Yeshwanthpur Campus",
  "English and Cultural Studies, Yeshwanthpur",
  "Bangalore Bannerghatta Road Campus",
  "Bachelor of Arts (Political Science/Honours/Honours with Research)",
  "BA Liberal Arts (Honours/Honours with Research)",
  "BSC (Economics with Data Science/ Honours/ Honours with Research)",
  "BA (English / Honours / Honours with Research) and MA English and Cultural Studies",
  "Centre for Peace Praxis",
  "DREAMS"
];

export default function Login() {
  const [dept, setDept] = useState(DEPARTMENTS[0]);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
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
        {DEPARTMENTS.map((d, index) => (
          <option key={index} value={d}>
            {d}
          </option>
        ))}
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
