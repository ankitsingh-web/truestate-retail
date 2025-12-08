export default function SortDropdown({ sort, onChange }) {
  const currentKey =
    sort.sortBy === "customerName"
      ? "customerName_asc"
      : sort.sortBy === "quantity"
      ? `quantity_${sort.sortOrder}`
      : "date_desc";

  const handleChange = (value) => {
    if (value === "date_desc") {
      onChange({ sortBy: "date", sortOrder: "desc" });
    } else if (value === "quantity_desc") {
      onChange({ sortBy: "quantity", sortOrder: "desc" });
    } else if (value === "customerName_asc") {
      onChange({ sortBy: "customerName", sortOrder: "asc" });
    }
  };

  return (
    <div className="sort-dropdown">
      <label>
        Sort by:{" "}
        <select
          value={currentKey}
          onChange={(e) => handleChange(e.target.value)}
        >
          <option value="date_desc">Date (Newest First)</option>
          <option value="quantity_desc">Quantity (High to Low)</option>
          <option value="customerName_asc">Customer Name (A–Z)</option>
        </select>
      </label>
    </div>
  );
}
