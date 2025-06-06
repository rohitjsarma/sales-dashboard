import './globals.css';

export const metadata = {
  title: 'Sales Dashboard',
  description: 'Responsive dashboard with metrics and data table',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="p-6">{children}</body>
    </html>
  );
}
