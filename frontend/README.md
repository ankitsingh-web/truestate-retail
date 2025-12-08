# Retail Sales Management System

## 1. Overview

A full-stack Retail Sales Management System built for TruEstate SDE Intern assignment.  
It loads sales data from a CSV file, exposes a clean API for search/filter/sort/pagination,  
and includes a React UI with search bar, filter panel, sortable transaction table, and pagination.

## 2. Tech Stack

- Backend: Node.js, Express, csv-parser
- Frontend: React, Vite, Fetch API
- Language: JavaScript (ES6+)

## 3. Search Implementation Summary

Search is implemented in the backend on the `/api/sales` endpoint using the `search` query param.  
It performs case-insensitive full-text matching on `Customer Name` and `Phone Number`.  
Search works together with all filters, sorting, and pagination in a single pipeline.

## 4. Filter Implementation Summary

Filters are applied in the backend based on query params:

- Multi-select: `customerRegion`, `gender`, `productCategory`, `tags`, `paymentMethod`
- Range: `minAge`, `maxAge`, `startDate`, `endDate`  
  Filters can be combined freely and work together with search and sorting.  
  An additional `/api/filters` endpoint exposes distinct filter options (regions, genders, categories, etc.).

## 5. Sorting Implementation Summary

Sorting is handled via `sortBy` and `sortOrder` query params at `/api/sales`.  
Supported fields:

- `date` (default: newest first)
- `quantity`
- `customerName` (A–Z)  
  Sorting runs after filters and search, and preserves all active criteria.

## 6. Pagination Implementation Summary

Pagination uses `page` (1-based) and `pageSize` query params (default: 10).  
The backend returns paginated results with metadata: `total`, `page`, `pageSize`, and `totalPages`.  
The frontend shows Next/Previous controls that keep current search, filters, and sorting.

## 7. Setup Instructions

### Backend

```bash
cd backend
npm install
# Put CSV at: backend/data/truestate_assignment_dataset.csv
npm run dev   # or: npm start
```
