'use client';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import MetricCards from '../components/MetricCards';
import ChartSection from '../components/ChartSection';
import DataTable from '../components/DataTable';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/data/sales.csv');
      const text = await res.text();
      const parsed = Papa.parse(text, { header: true, dynamicTyping: true });
      setData(parsed.data.filter(row => row.Date));
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
    <h1 className="text-3xl font-bold mb-4 ">Sales Dashboard</h1>

      <div className="flex gap-4 mb-6">
        <a href="#charts" className="text-blue-600 hover:underline">Go to Charts</a> &nbsp;
        <a href="#table" className="text-blue-600 hover:underline">Go to Data Table</a> 
      </div> <br/>

      <MetricCards data={data} />

      <div id="charts">
        <ChartSection data={data} />
      </div>

      <div id="table">
        <DataTable data={data} />
      </div>
    </div>
  );
}
