const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'API Error');
  }
  return res.json();
}

export async function fetchSales(queryString) {
  const url = `${BASE_URL}/sales${queryString ? `?${queryString}` : ''}`;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function fetchFilterOptions() {
  const url = `${BASE_URL}/sales/filters`;
  const res = await fetch(url);
  return handleResponse(res);
}
