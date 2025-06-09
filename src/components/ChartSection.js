'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import '../css/ChartSection.css';

export default function ChartSection() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  // Revenue by Region
  const regionRevenue = data.reduce((acc, d) => {
    if (!acc[d.Region]) acc[d.Region] = 0;
    acc[d.Region] += parseFloat(d.Total_Revenue || 0);
    return acc;
  }, {});
  const chartData = Object.entries(regionRevenue).map(([region, revenue]) => ({
    region,
    revenue,
  }));

  // Revenue Over Time
  const revenueOverTime = {};
  data.forEach((d) => {
    const dateStr = new Date(d.Date);
    if (!isNaN(dateStr)) {
      const date = dateStr.toISOString().split('T')[0];
      revenueOverTime[date] =
        (revenueOverTime[date] || 0) + parseFloat(d.Total_Revenue || 0);
    }
  });
  const lineData = Object.entries(revenueOverTime).map(([date, revenue]) => ({
    date,
    revenue,
  }));

  // Product Performance
  const productPerformance = {};
  data.forEach((d) => {
    productPerformance[d.Product] =
      (productPerformance[d.Product] || 0) + parseFloat(d.Total_Revenue || 0);
  });
  const productData = Object.entries(productPerformance).map(
    ([product, revenue]) => ({
      product,
      revenue,
    })
  );

  // Product Revenue Trends Over Time
  const productRevenueTrend = {};
  data.forEach((d) => {
    const dateStr = new Date(d.Date);
    if (!isNaN(dateStr)) {
      const date = dateStr.toISOString().split('T')[0];
      const product = d.Product;

      if (!productRevenueTrend[date]) productRevenueTrend[date] = {};
      productRevenueTrend[date][product] =
        (productRevenueTrend[date][product] || 0) +
        parseFloat(d.Total_Revenue || 0);
    }
  });

  const allProducts = Array.from(new Set(data.map((d) => d.Product)));

  const productLineData = Object.entries(productRevenueTrend).map(
    ([date, productRevenues]) => {
      const entry = { date };
      allProducts.forEach((product) => {
        entry[product] = productRevenues[product] || 0;
      });
      return entry;
    }
  );

  // Monthly Growth Chart
  const monthlyGrowth = {};
  data.forEach((d) => {
    const date = new Date(d.Date);
    if (!isNaN(date)) {
      const month = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;
      monthlyGrowth[month] =
        (monthlyGrowth[month] || 0) + parseFloat(d.Total_Revenue || 0);
    }
  });
  const monthlyGrowthData = Object.entries(monthlyGrowth).map(
    ([month, revenue]) => ({
      month,
      revenue,
    })
  );

  // Sales Rep Leaderboard
  const repPerformance = {};
  data.forEach((d) => {
    repPerformance[d.Sales_Rep] =
      (repPerformance[d.Sales_Rep] || 0) + parseFloat(d.Total_Revenue || 0);
  });
  const leaderboard = Object.entries(repPerformance)
    .map(([rep, revenue]) => ({ rep, revenue }))
    .sort((a, b) => b.revenue - a.revenue);

  // Pie chart for top products
  const topProducts = [...productData]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5); // top 5
  const pieColors = ['#6366f1', '#10b981', '#f97316', '#eab308', '#ec4899'];

  return (
    <div className="grid gap-8">
     
      <div className="chart-card">
        <h2 className="chart-title">Revenue by Region</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>


      <div className="chart-card">
        <h2 className="chart-title">Revenue Trend Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h2 className="chart-title">Product Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={productData}>
            <XAxis dataKey="product" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h2 className="chart-title">Product Revenue Trends Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={productLineData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {allProducts.map((product, idx) => (
              <Line
                key={product}
                type="monotone"
                dataKey={product}
                stroke={`hsl(${(idx * 45) % 360}, 70%, 50%)`}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

 
      <div className="chart-card">
        <h2 className="chart-title">Monthly Growth</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyGrowthData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#4f46e5"
              fill="#c7d2fe"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h2 className="chart-title">Sales Rep Leaderboard</h2>
        <ul className="leaderboard">
          {leaderboard.map((item, idx) => (
            <li className="leaderboard-item" key={item.rep}>
              <strong>{idx + 1}. {item.rep}</strong> — ₹{item.revenue.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <div className="chart-card">
        <h2 className="chart-title">Top Products by Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={topProducts}
              dataKey="revenue"
              nameKey="product"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {topProducts.map((entry, idx) => (
                <Cell key={entry.product} fill={pieColors[idx % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
