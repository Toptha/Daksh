// src/pages/Form.jsx
import { useEffect, useState } from "react";
import VisitorForm from "../components/VisitorForm";
import ExportButton from "../components/ExportButton";

// turn label/id into a safe string
const slugify = (s = "") =>
  s
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 60);

const makeStableKey = (idOrLabel) =>
  `daksh_visitors_${slugify(idOrLabel || "unknown")}`;

export default function FormPage() {
  const [deptId, setDeptId] = useState("");
  const [deptLabel, setDeptLabel] = useState("");
  const [storageKey, setStorageKey] = useState("");

  // load dept info (old or new)
  useEffect(() => {
    const legacyDept = localStorage.getItem("dept");
    const savedDeptId = localStorage.getItem("deptId");
    const savedDeptLabel = localStorage.getItem("deptLabel");

    if (savedDeptId) {
      setDeptId(savedDeptId);
      setDeptLabel(savedDeptLabel || savedDeptId);
    } else if (legacyDept) {
      const looksLikeId = /^[a-z0-9_-]+$/i.test(legacyDept);
      if (looksLikeId) {
        setDeptId(legacyDept);
        setDeptLabel(legacyDept);
      } else {
        setDeptLabel(legacyDept);
        setDeptId(legacyDept);
      }
    }
  }, []);

  // create stable key
  useEffect(() => {
    const idOrLabel = deptId || deptLabel || "unknown";
    setStorageKey(makeStableKey(idOrLabel));
  }, [deptId, deptLabel]);

  // MIGRATION: merge old keys → new stable key
  useEffect(() => {
    if (!storageKey) return;

    const label = deptLabel || deptId || "";
    if (!label) return;

    let merged = [];

    Object.keys(localStorage).forEach((k) => {
      try {
        const raw = localStorage.getItem(k);
        if (!raw) return;

        const kLower = k.toLowerCase();
        const labelLower = label.toLowerCase();

        const isOldKey =
          kLower.includes(labelLower) ||
          ["dept", "deptid", "deptlabel"].includes(kLower) ||
          kLower.includes("visitor");

        if (!isOldKey) return;

        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) merged = merged.concat(parsed);

        const backup = `daksh_backup_${k}`;
        if (!localStorage.getItem(backup)) {
          localStorage.setItem(backup, raw);
        }
        localStorage.removeItem(k);
      } catch {}
    });

    // dedupe by email+phone
    const seen = new Set();
    const deduped = merged.filter((v) => {
      const sig = `${(v.email || "").toLowerCase()}|${(v.phone || "")}`;
      if (seen.has(sig)) return false;
      seen.add(sig);
      return true;
    });

    const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const combined = [...existing, ...deduped];

    if (combined.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(combined));
    }
  }, [storageKey]);

  const title = deptLabel
    ? `${deptLabel} Visitor Form`
    : "Unknown Visitor Form";

  return (
    <div className="container">
      <h2>{title}</h2>
      <VisitorForm dept={storageKey} deptLabel={deptLabel} />
      <ExportButton dept={storageKey} />
    </div>
  );
}
