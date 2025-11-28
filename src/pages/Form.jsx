// src/pages/Form.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisitorForm from "../components/VisitorForm";
import ExportButton from "../components/ExportButton";

export default function FormPage() {
  const navigate = useNavigate();
  const [deptId, setDeptId] = useState("");
  const [deptLabel, setDeptLabel] = useState("");

  useEffect(() => {
    // support multiple possible storage patterns:
    // 1) legacy: localStorage.setItem("dept", "<label>")  (old)
    // 2) new: localStorage.setItem("deptId", "<id>"); localStorage.setItem("deptLabel", "<label>");
    // 3) some versions may have saved the id under "dept" (if you used id as value)
    const legacyDept = localStorage.getItem("dept");
    const savedDeptId = localStorage.getItem("deptId");
    const savedDeptLabel = localStorage.getItem("deptLabel");

    if (savedDeptId) {
      // new pattern: use id for storage & label for display
      setDeptId(savedDeptId);
      setDeptLabel(savedDeptLabel || savedDeptId);
    } else if (legacyDept) {
      // legacy: 'dept' might be a label or an id depending on earlier code;
      // we try to detect if it looks like an id (no spaces) — but treat it as id if needed.
      const looksLikeId = /^[a-z0-9_\-]+$/i.test(legacyDept);
      if (looksLikeId) {
        setDeptId(legacyDept);
        setDeptLabel(legacyDept);
      } else {
        // treat legacyDept as label and use a safe storage key (slugify fallback)
        setDeptLabel(legacyDept);
        // if you saved visitor arrays under the full label key in localStorage earlier,
        // we should keep reading/writing to that same key. So use legacyDept as storage key too.
        setDeptId(legacyDept);
      }
    } else {
      setDeptId("");
      setDeptLabel("");
    }
  }, []);

  // OPTIONAL: force redirect back to login if no dept found
  // useEffect(() => {
  //   if (!deptId && !deptLabel) navigate("/login");
  // }, [deptId, deptLabel, navigate]);

  const storageKey = deptId || "unknown_visitors";
  const title = deptLabel ? `${deptLabel} Visitor Form` : "Unknown Visitor Form";

  return (
    <div className="container">
      <h2>{title}</h2>
      <VisitorForm dept={storageKey} deptLabel={deptLabel} />
      <ExportButton dept={storageKey} />
    </div>
  );
}
