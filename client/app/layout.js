/* eslint-disable @next/next/no-head-element */
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <head></head>
      <body>{children}</body>
    </html>
  );
}
