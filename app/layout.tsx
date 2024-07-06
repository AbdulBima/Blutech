import type { Metadata } from "next";
import "./globals.css";
import { ApiContextProvider } from "../components/contexts/ApiContext";
import Header from "@/components/navigation/Header";



export const metadata: Metadata = {
  title: "Blutech Table",
  description: "Blutech Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

  <body className=' urbanist w-[100vw] h-[100vh]  bg-gray-100 overflow-y-auto overflow-x-hidden'>
      <ApiContextProvider>
        <Header/>
      {children}
      </ApiContextProvider>
      </body>
    </html>
  );
}
