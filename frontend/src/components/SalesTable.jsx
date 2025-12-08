function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date)) return "";
  return date.toLocaleDateString();
}

export default function SalesTable({ sales, loading, error }) {
  if (loading) {
    return <div className="table-state">Loading...</div>;
  }

  if (error) {
    return <div className="table-state error">Error: {error}</div>;
  }

  if (!sales.length) {
    return <div className="table-state">No results found.</div>;
  }

  return (
    <table className="sales-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Customer Name</th>
          <th>Phone</th>
          <th>Region</th>
          <th>Product</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Final Amount</th>
          <th>Payment Method</th>
          <th>Order Status</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((row, idx) => (
          <tr key={idx}>
            <td>{formatDate(row.date)}</td>
            <td>{row.customerName}</td>
            <td>{row.phoneNumber}</td>
            <td>{row.customerRegion}</td>
            <td>{row.productName}</td>
            <td>{row.productCategory}</td>
            <td>{row.quantity}</td>
            <td>{row.finalAmount}</td>
            <td>{row.paymentMethod}</td>
            <td>{row.orderStatus}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
