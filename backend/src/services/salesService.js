import { getSalesData } from '../utils/csvLoader.js';

function matchesMultiSelect(fieldValue, selected) {
  if (!selected || selected.length === 0) return true;
  if (!fieldValue) return false;
  return selected.includes(String(fieldValue));
}

function matchesTags(tagsField, selectedTags) {
  if (!selectedTags || selectedTags.length === 0) return true;
  if (!tagsField) return false;

  const saleTags = String(tagsField)
    .split(/[,;]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  return selectedTags.some((tag) => saleTags.includes(tag));
}

export function getFilterOptions() {
  const data = getSalesData();

  const unique = (arr) => Array.from(new Set(arr.filter(Boolean))).sort();

  const customerRegions = unique(data.map((d) => d.customerRegion));
  const genders = unique(data.map((d) => d.gender));
  const productCategories = unique(data.map((d) => d.productCategory));
  const paymentMethods = unique(data.map((d) => d.paymentMethod));

  const allTags = data
    .flatMap((d) =>
      String(d.tags || '')
        .split(/[,;]+/)
        .map((t) => t.trim())
        .filter(Boolean)
    );
  const tags = unique(allTags);

  const ages = data.map((d) => d.age).filter((a) => a !== null);
  const dates = data.map((d) => d.date).filter((dt) => dt instanceof Date && !isNaN(dt));

  return {
    customerRegions,
    genders,
    productCategories,
    paymentMethods,
    tags,
    age: {
      min: ages.length ? Math.min(...ages) : null,
      max: ages.length ? Math.max(...ages) : null
    },
    date: {
      min: dates.length ? new Date(Math.min(...dates)) : null,
      max: dates.length ? new Date(Math.max(...dates)) : null
    }
  };
}

export function querySales(options) {
  const {
    search,
    customerRegions,
    genders,
    minAge,
    maxAge,
    productCategories,
    tags,
    paymentMethods,
    startDate,
    endDate,
    sortBy,
    sortOrder,
    page,
    pageSize
  } = options;

  const data = getSalesData();

  const searchLower = search ? search.toLowerCase() : null;

  let filtered = data.filter((sale) => {
    if (searchLower) {
      const name = (sale.customerName || '').toLowerCase();
      const phone = String(sale.phoneNumber || '').toLowerCase();
      if (!name.includes(searchLower) && !phone.includes(searchLower)) {
        return false;
      }
    }

    if (!matchesMultiSelect(sale.customerRegion, customerRegions)) return false;
    if (!matchesMultiSelect(sale.gender, genders)) return false;
    if (!matchesMultiSelect(sale.productCategory, productCategories)) return false;
    if (!matchesMultiSelect(sale.paymentMethod, paymentMethods)) return false;

    if (!matchesTags(sale.tags, tags)) return false;

    if (minAge !== null && sale.age !== null && sale.age < minAge) return false;
    if (maxAge !== null && sale.age !== null && sale.age > maxAge) return false;

    if (sale.date instanceof Date && !isNaN(sale.date)) {
      if (startDate && sale.date < startDate) return false;
      if (endDate && sale.date > endDate) return false;
    }

    return true;
  });

  const order = sortOrder === 'asc' ? 1 : -1;
  const sorted = [...filtered].sort((a, b) => {
    if (!sortBy || sortBy === 'date') {
      const da = a.date ? a.date.getTime() : 0;
      const db = b.date ? b.date.getTime() : 0;
      return (db - da) * (order === -1 ? 1 : -1);
    }

    if (sortBy === 'quantity') {
      const qa = a.quantity || 0;
      const qb = b.quantity || 0;
      if (qa === qb) return 0;
      return qa < qb ? -1 * order : 1 * order;
    }

    if (sortBy === 'customerName') {
      const na = (a.customerName || '').toLowerCase();
      const nb = (b.customerName || '').toLowerCase();
      if (na === nb) return 0;
      return na < nb ? -1 * order : 1 * order;
    }

    return 0;
  });

  const total = sorted.length;
  const safePageSize = pageSize || 10;
  const totalPages = total === 0 ? 1 : Math.ceil(total / safePageSize);
  const safePage = Math.min(Math.max(page || 1, 1), totalPages);

  const startIndex = (safePage - 1) * safePageSize;
  const items = sorted.slice(startIndex, startIndex + safePageSize);

  return {
    items,
    total,
    page: safePage,
    pageSize: safePageSize,
    totalPages
  };
}
