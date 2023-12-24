export const metadata = {
  title: "hyperDB",
  description:
    "hyperDB, a database that does probabilistic inference and hypothetical update",
};

import "../global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
