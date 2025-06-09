import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'sales.csv');

    const fileContent = fs.readFileSync(filePath, 'utf8');

    const { data, errors } = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
    });

    if (errors.length > 0) {
      return NextResponse.json({ error: 'CSV parsing error', details: errors }, { status: 400 });
    }

    const parsedData = data.map((row) => ({
      ...row,
      Total_Revenue: parseFloat(row.Total_Revenue || 0),
    }));

    return NextResponse.json(parsedData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
