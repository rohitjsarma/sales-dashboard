'use client';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import MetricCards from '../../components/MetricCards';

export default function CardPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data/sales.csv')
      .then(res => res.text())
      .then(csv => {
        const parsed = Papa.parse(csv, { header: true });
        setData(parsed.data);
      });
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">📈 Sales Metrics</h1>
      {data.length > 0 ? <MetricCards data={data} /> : <p>Loading...</p>}
    </main>
  );
}
