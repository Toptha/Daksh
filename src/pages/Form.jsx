import VisitorForm from "../components/VisitorForm";
import ExportButton from "../components/ExportButton";

export default function FormPage() {
  const dept = localStorage.getItem("dept") || "Unknown";

  return (
    <div className="container">
      <h2>{dept} Visitor Form</h2>
      <VisitorForm dept={dept} />
      <ExportButton dept={dept} />
    </div>
  );
}
