import { useState } from "react";

export default function VisitorForm({ dept }) {
  const [visitor, setVisitor] = useState({
    name: "",
    email: "",
    phone: "",
    isParent: false,
    heardFrom: [],
  });

  const handleSubmit = () => {
    if (!visitor.name || !visitor.email || !visitor.phone) {
      alert("Please fill all fields!");
      return;
    }
    const data = JSON.parse(localStorage.getItem(dept)) || [];
    data.push(visitor);
    localStorage.setItem(dept, JSON.stringify(data));
    alert("Visitor saved!");
    setVisitor({ name: "", email: "", phone: "", isParent: false, heardFrom: [] });
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
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={visitor.name}
          onChange={(e) => setVisitor({ ...visitor, name: e.target.value })}
          placeholder="Enter full name"
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          value={visitor.email}
          onChange={(e) => setVisitor({ ...visitor, email: e.target.value })}
          placeholder="Enter email"
        />
      </div>

      <div>
        <label>Phone</label>
        <input
          type="tel"
          value={visitor.phone}
          onChange={(e) => setVisitor({ ...visitor, phone: e.target.value })}
          placeholder="Enter phone number"
        />
      </div>

      <div className="toggle-parent">
        <input
          type="checkbox"
          checked={visitor.isParent}
          onChange={(e) => setVisitor({ ...visitor, isParent: e.target.checked })}
        />
        <label>Parent?</label>
      </div>

      <div>
        <label>How did you hear about Daksh?</label>
        <div className="checkbox-group">
          {["Instagram", "Facebook", "Friends", "Posters"].map((src) => (
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
      </div>

      <button onClick={handleSubmit}>Save Visitor</button>
    </div>
  );
}
