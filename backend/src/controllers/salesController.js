import { getFilterOptions, querySales } from '../services/salesService.js';
import { parseMultiValue, parseNumberParam, parseDateParam } from '../utils/queryUtils.js';

export function getSales(req, res) {
  try {
    let {
      search,
      customerRegion,
      gender,
      productCategory,
      tags,
      paymentMethod,
      minAge,
      maxAge,
      startDate,
      endDate,
      sortBy,
      sortOrder,
      page,
      pageSize
    } = req.query;

    const customerRegions = parseMultiValue(customerRegion);
    const genders = parseMultiValue(gender);
    const productCategories = parseMultiValue(productCategory);
    const tagsArr = parseMultiValue(tags);
    const paymentMethods = parseMultiValue(paymentMethod);

    let minAgeNum = parseNumberParam(minAge);
    let maxAgeNum = parseNumberParam(maxAge);
    if (minAgeNum !== null && maxAgeNum !== null && minAgeNum > maxAgeNum) {
      [minAgeNum, maxAgeNum] = [maxAgeNum, minAgeNum];
    }

    let startDt = parseDateParam(startDate);
    let endDt = parseDateParam(endDate);
    if (startDt && endDt && startDt > endDt) {
      [startDt, endDt] = [endDt, startDt];
    }

    const pageNum = parseNumberParam(page) || 1;
    const pageSizeNum = parseNumberParam(pageSize) || 10;

    const result = querySales({
      search: search || '',
      customerRegions,
      genders,
      minAge: minAgeNum,
      maxAge: maxAgeNum,
      productCategories,
      tags: tagsArr,
      paymentMethods,
      startDate: startDt,
      endDate: endDt,
      sortBy: sortBy || 'date',
      sortOrder: sortOrder || 'desc',
      page: pageNum,
      pageSize: pageSizeNum
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export function getFilters(req, res) {
  try {
    const options = getFilterOptions();
    res.json(options);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
