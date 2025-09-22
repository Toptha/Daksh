import * as XLSX from "xlsx";

export default function ExportButton({ dept }) {
  const exportData = () => {
    const data = JSON.parse(localStorage.getItem(dept)) || [];
    if (data.length === 0) {
      alert("No data to export!");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Visitors");
    XLSX.writeFile(workbook, `${dept}_visitors.xlsx`);
  };

  return <button onClick={exportData}>Export Data</button>;
}
