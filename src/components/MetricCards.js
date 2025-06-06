import '../css/Metriccard.css';

export default function MetricCards({ data }) {
  const totalRevenue = data.reduce((acc, d) => acc + parseFloat(d.Total_Revenue || 0), 0);
  const totalSales = data.length;
  const uniqueCustomers = new Set(data.map(d => d.Customer_Name)).size;

  const metrics = [
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      color: 'blue',
    },
    {
      label: 'Total Sales',
      value: totalSales,
      color: 'green',
    },
    {
      label: 'Unique Customers',
      value: uniqueCustomers,
      color: 'yellow',
    },
  ];

  return (
    <div className="metric-cards">
      {metrics.map((m, idx) => (
        <div key={idx} className={`metric-card ${m.color}`}>
          <h3 className="metric-title">{m.label}</h3>
          <p className="metric-value">{m.value}</p>
        </div>
      ))}
    </div>
  );
}
