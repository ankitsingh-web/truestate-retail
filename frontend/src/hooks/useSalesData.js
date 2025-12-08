import { useEffect, useState } from 'react';
import { fetchSales, fetchFilterOptions } from '../services/api.js';
import { buildSalesQueryParams } from '../utils/queryParams.js';

export function useSalesData({ searchTerm, filters, sort, page, pageSize }) {
  const [sales, setSales] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, totalPages: 1, pageSize });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterOptions, setFilterOptions] = useState(null);

  useEffect(() => {
    fetchFilterOptions()
      .then(setFilterOptions)
      .catch((err) => console.error('Failed to load filter options', err));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    async function loadSales() {
      try {
        setLoading(true);
        setError('');
        const queryString = buildSalesQueryParams({
          searchTerm,
          filters,
          sort,
          page,
          pageSize
        });
        const data = await fetchSales(queryString, { signal: controller.signal });
        setSales(data.items);
        setMeta({
          total: data.total,
          page: data.page,
          totalPages: data.totalPages,
          pageSize: data.pageSize
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load sales');
        }
      } finally {
        setLoading(false);
      }
    }
    loadSales();
    return () => controller.abort();
  }, [searchTerm, filters, sort, page, pageSize]);

  return { sales, meta, loading, error, filterOptions };
}
