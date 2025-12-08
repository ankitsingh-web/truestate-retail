export default function FilterPanel({ filters, options, onChange }) {
  if (!options) return null;

  const { customerRegions, genders, productCategories, paymentMethods, tags } =
    options;

  const toggleInArray = (field, value) => {
    const current = filters[field] || [];
    const exists = current.includes(value);
    const next = exists
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [field]: next });
  };

  const updateRange = (field, subField, value) => {
    const current = filters[field] || { min: "", max: "" };
    onChange({ ...filters, [field]: { ...current, [subField]: value } });
  };

  return (
    <div className="filter-panel">
      <h3>Filters</h3>

      <section>
        <h4>Customer Region</h4>
        {customerRegions.map((region) => (
          <label key={region} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.customerRegions?.includes(region) || false}
              onChange={() => toggleInArray("customerRegions", region)}
            />
            {region}
          </label>
        ))}
      </section>

      <section>
        <h4>Gender</h4>
        {genders.map((g) => (
          <label key={g} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.genders?.includes(g) || false}
              onChange={() => toggleInArray("genders", g)}
            />
            {g}
          </label>
        ))}
      </section>

      <section>
        <h4>Age Range</h4>
        <div className="filter-range">
          <input
            type="number"
            placeholder="Min"
            value={filters.ageRange?.min || ""}
            onChange={(e) => updateRange("ageRange", "min", e.target.value)}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.ageRange?.max || ""}
            onChange={(e) => updateRange("ageRange", "max", e.target.value)}
          />
        </div>
      </section>

      <section>
        <h4>Product Category</h4>
        {productCategories.map((cat) => (
          <label key={cat} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.productCategories?.includes(cat) || false}
              onChange={() => toggleInArray("productCategories", cat)}
            />
            {cat}
          </label>
        ))}
      </section>

      <section>
        <h4>Tags</h4>
        <div className="filter-tags">
          {tags.slice(0, 20).map((tag) => (
            <label key={tag} className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.tags?.includes(tag) || false}
                onChange={() => toggleInArray("tags", tag)}
              />
              {tag}
            </label>
          ))}
        </div>
      </section>

      <section>
        <h4>Payment Method</h4>
        {paymentMethods.map((pm) => (
          <label key={pm} className="filter-checkbox">
            <input
              type="checkbox"
              checked={filters.paymentMethods?.includes(pm) || false}
              onChange={() => toggleInArray("paymentMethods", pm)}
            />
            {pm}
          </label>
        ))}
      </section>

      <section>
        <h4>Date Range</h4>
        <div className="filter-range">
          <input
            type="date"
            value={filters.dateRange?.start || ""}
            onChange={(e) => updateRange("dateRange", "start", e.target.value)}
          />
          <span>-</span>
          <input
            type="date"
            value={filters.dateRange?.end || ""}
            onChange={(e) => updateRange("dateRange", "end", e.target.value)}
          />
        </div>
      </section>
    </div>
  );
}
