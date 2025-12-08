import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import FilterPanel from "./components/FilterPanel.jsx";
import SortDropdown from "./components/SortDropdown.jsx";
import SalesTable from "./components/SalesTable.jsx";
import Pagination from "./components/Pagination.jsx";
import { useSalesData } from "./hooks/useSalesData.js";

const PAGE_SIZE = 10;

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    customerRegions: [],
    genders: [],
    ageRange: { min: "", max: "" },
    productCategories: [],
    tags: [],
    paymentMethods: [],
    dateRange: { start: "", end: "" },
  });

  const [sort, setSort] = useState({ sortBy: "date", sortOrder: "desc" });
  const [page, setPage] = useState(1);

  const { sales, meta, loading, error, filterOptions } = useSalesData({
    searchTerm,
    filters,
    sort,
    page,
    pageSize: PAGE_SIZE,
  });

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleFiltersChange = (nextFilters) => {
    setFilters(nextFilters);
    setPage(1);
  };

  const handleSortChange = (nextSort) => {
    setSort(nextSort);
    setPage(1);
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Retail Sales Management</h1>
      </header>

      <div className="app-toolbar">
        <SearchBar value={searchTerm} onChange={handleSearchChange} />
        <SortDropdown sort={sort} onChange={handleSortChange} />
      </div>

      <main className="app-main">
        <aside className="app-sidebar">
          <FilterPanel
            filters={filters}
            options={filterOptions}
            onChange={handleFiltersChange}
          />
        </aside>

        <section className="app-content">
          <SalesTable sales={sales} loading={loading} error={error} />
          <Pagination
            page={meta.page}
            totalPages={meta.totalPages}
            total={meta.total}
            pageSize={meta.pageSize}
            onPageChange={handlePageChange}
          />
        </section>
      </main>
    </div>
  );
}
