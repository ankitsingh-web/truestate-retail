import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';
import Sale from '../models/saleModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let SALES_DATA = [];

export function getSalesData() {
  return SALES_DATA;
}

export async function loadSalesData() {
  return new Promise((resolve, reject) => {
    const results = [];
    const filePath = path.join(__dirname, '..', '..', 'data', 'truestate_assignment_dataset.csv');

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        try {
          const sale = Sale.fromCsvRow(row);
          results.push(sale);
        } catch (err) {
          console.warn('Skipping invalid row:', err.message);
        }
      })
      .on('end', () => {
        SALES_DATA = results;
        console.log(`Loaded ${SALES_DATA.length} sales records.`);
        resolve();
      })
      .on('error', (err) => {
        console.error('Error reading CSV:', err);
        reject(err);
      });
  });
}
