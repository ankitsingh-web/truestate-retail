export default class Sale {
  constructor(data) {
    Object.assign(this, data);
  }

  static fromCsvRow(row) {
    const parseNumber = (v) =>
      v === undefined || v === null || v === '' ? null : Number(v);

    const parseDate = (v) => (v ? new Date(v) : null);

    return new Sale({
      customerId: row['Customer ID'],
      customerName: row['Customer Name'],
      phoneNumber: row['Phone Number'],
      gender: row['Gender'],
      age: parseNumber(row['Age']),
      customerRegion: row['Customer Region'],
      customerType: row['Customer Type'],

      productId: row['Product ID'],
      productName: row['Product Name'],
      brand: row['Brand'],
      productCategory: row['Product Category'],
      tags: row['Tags'] || '',

      quantity: parseNumber(row['Quantity']),
      pricePerUnit: parseNumber(row['Price per Unit']),
      discountPercentage: parseNumber(row['Discount Percentage']),
      totalAmount: parseNumber(row['Total Amount']),
      finalAmount: parseNumber(row['Final Amount']),

      date: parseDate(row['Date']),
      paymentMethod: row['Payment Method'],
      orderStatus: row['Order Status'],
      deliveryType: row['Delivery Type'],
      storeId: row['Store ID'],
      storeLocation: row['Store Location'],
      salespersonId: row['Salesperson ID'],
      employeeName: row['Employee Name']
    });
  }
}
