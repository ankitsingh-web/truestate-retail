export function buildSalesQueryParams({ searchTerm, filters, sort, page, pageSize }) {
  const params = new URLSearchParams();

  if (searchTerm) params.set('search', searchTerm);

  const { customerRegions, genders, ageRange, productCategories, tags, paymentMethods, dateRange } =
    filters || {};

  if (customerRegions?.length) params.set('customerRegion', customerRegions.join(','));
  if (genders?.length) params.set('gender', genders.join(','));
  if (productCategories?.length) params.set('productCategory', productCategories.join(','));
  if (tags?.length) params.set('tags', tags.join(','));
  if (paymentMethods?.length) params.set('paymentMethod', paymentMethods.join(','));

  if (ageRange?.min) params.set('minAge', ageRange.min);
  if (ageRange?.max) params.set('maxAge', ageRange.max);

  if (dateRange?.start) params.set('startDate', dateRange.start);
  if (dateRange?.end) params.set('endDate', dateRange.end);

  if (sort?.sortBy) params.set('sortBy', sort.sortBy);
  if (sort?.sortOrder) params.set('sortOrder', sort.sortOrder);

  if (page) params.set('page', page);
  if (pageSize) params.set('pageSize', pageSize);

  return params.toString();
}
