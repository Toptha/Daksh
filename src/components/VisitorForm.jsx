// src/components/VisitorForm.jsx
import { useState, useEffect } from "react";
import "./styles/visitorform.css";

export default function VisitorForm({ dept, deptLabel }) {
  useEffect(() => {
    console.log("VisitorForm mounted:", dept);
  }, [dept]);

  const [visitor, setVisitor] = useState({
    name: "",
    email: "",
    phone: "",
    isParent: null,
    heardFrom: [],
  });

  const handleSubmit = () => {
    if (
      !visitor.name ||
      !visitor.email ||
      !visitor.phone ||
      visitor.isParent === null
    ) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const data = JSON.parse(localStorage.getItem(dept)) || [];
      data.push(visitor);
      localStorage.setItem(dept, JSON.stringify(data));
      alert("Visitor saved!");

      setVisitor({
        name: "",
        email: "",
        phone: "",
        isParent: null,
        heardFrom: [],
      });
    } catch (err) {
      alert("Saving failed");
    }
  };

  const toggleSource = (src) => {
    setVisitor((prev) => {
      const exists = prev.heardFrom.includes(src);
      return {
        ...prev,
        heardFrom: exists
          ? prev.heardFrom.filter((s) => s !== src)
          : [...prev.heardFrom, src],
      };
    });
  };

  return (
    <div className="visitor-form">
      <h2>{deptLabel ? `${deptLabel} — Visitor Registration` : "Visitor Registration"}</h2>

      <label>Name</label>
      <input
        type="text"
        value={visitor.name}
        onChange={(e) => setVisitor({ ...visitor, name: e.target.value })}
      />

      <label>Email</label>
      <input
        type="email"
        value={visitor.email}
        onChange={(e) => setVisitor({ ...visitor, email: e.target.value })}
      />

      <label>Phone</label>
      <input
        type="tel"
        value={visitor.phone}
        onChange={(e) => setVisitor({ ...visitor, phone: e.target.value })}
      />

      <div className="form-radio">
        <label>Are you a parent?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="isParent"
              checked={visitor.isParent === true}
              onChange={() => setVisitor({ ...visitor, isParent: true })}
            />
            Yes
          </label>

          <label>
            <input
              type="radio"
              name="isParent"
              checked={visitor.isParent === false}
              onChange={() => setVisitor({ ...visitor, isParent: false })}
            />
            No
          </label>
        </div>
      </div>

      <label>How did you hear about Daksh?</label>
      <div className="checkbox-group">
        {["Instagram", "LinkedIn", "Friends", "Posters", "The Hindu Newspaper"].map((src) => (
          <label key={src}>
            <input
              type="checkbox"
              checked={visitor.heardFrom.includes(src)}
              onChange={() => toggleSource(src)}
            />
            {src}
          </label>
        ))}
      </div>

      <button onClick={handleSubmit}>Save Visitor</button>
    </div>
  );
}
