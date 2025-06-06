import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ChartSection({ data }) {
  const regionRevenue = data.reduce((acc, d) => {
    if (!acc[d.Region]) acc[d.Region] = 0;
    acc[d.Region] += d.Total_Revenue || 0;
    return acc;
  }, {});

  const chartData = Object.entries(regionRevenue).map(([region, value]) => ({
    region, revenue: value
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Revenue by Region</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="region" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
