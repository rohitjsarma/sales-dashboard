'use client';

import { useEffect, useState, useMemo } from 'react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import '../css/Datatable.css';

export default function DataTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [salesRepFilter, setSalesRepFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  const uniqueRegions = [...new Set(data.map(d => d.Region))];
  const uniqueSalesReps = [...new Set(data.map(d => d.Sales_Rep))];
  const uniqueCategories = [...new Set(data.map(d => d.Product_Category))];
  const uniqueProducts = [...new Set(data.map(d => d.Product_Name))];

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch =
        row.Product_Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.Sales_Rep?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRegion = regionFilter ? row.Region === regionFilter : true;
      const matchesSalesRep = salesRepFilter ? row.Sales_Rep === salesRepFilter : true;
      const matchesCategory = categoryFilter ? row.Product_Category === categoryFilter : true;
      const matchesProduct = productFilter ? row.Product_Name === productFilter : true;

      const dateValid = (() => {
        if (!row.Date) return true;
        const rowDate = new Date(row.Date);
        const from = dateRange.from ? new Date(dateRange.from) : null;
        const to = dateRange.to ? new Date(dateRange.to) : null;

        if (from && rowDate < from) return false;
        if (to && rowDate > to) return false;

        return true;
      })();

      return matchesSearch && matchesRegion && matchesSalesRep && matchesCategory && matchesProduct && dateValid;
    });
  }, [data, searchTerm, regionFilter, salesRepFilter, categoryFilter, productFilter, dateRange]);

  const handleExport = () => {
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'filtered-data.csv');
  };

  const handleRegionClick = (region) => {
    setRegionFilter(region);
  };

  return (
    <div className="datatable-wrapper">
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search Product or Sales Rep"
          className="filter-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={salesRepFilter}
          onChange={(e) => setSalesRepFilter(e.target.value)}
          className="filter-input"
        >
          <option value="">All Sales Reps</option>
          {uniqueSalesReps.map((rep, idx) => (
            <option key={idx} value={rep}>{rep}</option>
          ))}
        </select>

        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="filter-input"
        >
          <option value="">All Regions</option>
          {uniqueRegions.map((region, idx) => (
            <option key={idx} value={region}>{region}</option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="filter-input"
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
          className="filter-input"
        >
          <option value="">All Products</option>
          {uniqueProducts.map((product, idx) => (
            <option key={idx} value={product}>{product}</option>
          ))}
        </select>

        <div className="date-range">
          <input
            type="date"
            className="filter-input"
            value={dateRange.from}
            onChange={(e) => setDateRange((prev) => ({ ...prev, from: e.target.value }))}
          />
          <input
            type="date"
            className="filter-input"
            value={dateRange.to}
            onChange={(e) => setDateRange((prev) => ({ ...prev, to: e.target.value }))}
          />
        </div>

        <button onClick={handleExport} className="export-btn">Export CSV</button>
      </div>

      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              {headers.map((header, idx) => (
                <th key={idx}>{header.replace(/_/g, ' ')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    className={header === 'Region' ? 'region-cell' : ''}
                    onClick={() => header === 'Region' && handleRegionClick(row[header])}
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
