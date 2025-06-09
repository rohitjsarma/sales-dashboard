'use client';
import Link from 'next/link';
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
      link: '/chart',
    },
    {
      label: 'Total Sales',
      value: totalSales,
      color: 'green',
      link: '/table',
    },
    {
      label: 'Unique Customers',
      value: uniqueCustomers,
      color: 'yellow',
      link: '/',
    },
  ];

  return (
    <div className="metric-cards">
      {metrics.map((m, idx) => (
        <Link key={idx} href={m.link} className={`metric-card ${m.color}`}>
          <div>
            <h3 className="metric-title">{m.label}</h3>
            <p className="metric-value">{m.value}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
