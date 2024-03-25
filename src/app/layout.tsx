import "./globals.css";
import type { Metadata } from "next";
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "Todo Web App",
  description: "This is the web app for todo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <main> {children}  </main>
      </body>
    </html>
  );
}
