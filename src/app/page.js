'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main
      className="w-screen h-screen bg-cover bg-center bg-no-repeat text-white flex flex-col px-6"
      style={{ backgroundImage: 'url("/images/db.jpg")' }}
    >
     
      <nav className="flex gap-6 text-lg mt-6 self-center mt-3">
        <Link
          href="/chart"
          className="bg-black/40 px-6 py-3 rounded-md border border-white hover:bg-white hover:text-black transition duration-300"
        >
          📊 Chart
        </Link>
        <Link
          href="/table"
          className="bg-black/40 px-6 py-3 rounded-md border border-white hover:bg-white hover:text-black transition duration-300"
        >
          📋 Data Table
        </Link>
        <Link
          href="/card"
          className="bg-black/40 px-6 py-3 rounded-md border border-white hover:bg-white hover:text-black transition duration-300"
        >
          📈 Metric Card
        </Link>
      </nav>

      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center drop-shadow-lg">
          Sales - Dashboard Navigation
        </h1>
      </div>
    </main>
  );
}
