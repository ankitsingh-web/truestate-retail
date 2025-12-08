export function parseMultiValue(param) {
  if (!param) return [];
  if (Array.isArray(param)) return param.filter(Boolean);
  return String(param)
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
}

export function parseNumberParam(value) {
  if (value === undefined || value === null || value === '') return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}

export function parseDateParam(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}
