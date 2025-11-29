// src/components/ExportButton.jsx
import { useState } from "react";
import * as XLSX from "xlsx";

export default function ExportButton({ dept }) {
  const [busy, setBusy] = useState(false);

  const exportData = () => {
    try {
      setBusy(true);

      const raw = JSON.parse(localStorage.getItem(dept)) || [];
      console.log("[ExportButton] dept:", dept);
      console.log("[ExportButton] raw:", raw);

      if (!raw || raw.length === 0) {
        alert("No data to export for this department.");
        setBusy(false);
        return;
      }

      const rows = raw.map((item, idx) => {
        const name = item?.name ?? "";
        const email = item?.email ?? "";
        const phone = item?.phone ?? "";
        const isParent =
          item?.isParent === true ? "Yes" : item?.isParent === false ? "No" : "";
        let heardFromField = "";

        if (Array.isArray(item?.heardFrom)) {
          heardFromField = item.heardFrom.join(", ");
        } else if (typeof item?.heardFrom === "string") {
          heardFromField = item.heardFrom;
        } else if (item?.heardFrom == null) {
          heardFromField = "";
        } else {
          try {
            heardFromField = JSON.stringify(item.heardFrom);
          } catch (e) {
            heardFromField = String(item.heardFrom);
          }
        }

        return {
          Name: name,
          Email: email,
          Phone: phone,
          IsParent: isParent,
          HeardFrom: heardFromField,
          _index: idx + 1
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Visitors");

      // sanitize filename (ESLint-clean regex)
      const safeDept = (dept || "visitors")
        .toString()
        .replace(/[^\w- ]+/g, "_")
        .slice(0, 60);

      const filename = `${safeDept}_visitors.xlsx`;
      XLSX.writeFile(workbook, filename);

      setBusy(false);
    } catch (err) {
      console.error("[ExportButton] export failed:", err);
      alert("Export failed — check console for details.");
      setBusy(false);
    }
  };

  return (
    <button onClick={exportData} disabled={busy}>
      {busy ? "Exporting..." : "Export Data (.xlsx)"}
    </button>
  );
}
