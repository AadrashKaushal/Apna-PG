"use client"
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import { GlobalProvider } from "@/contextApi/globalContext";
import { usePathname } from "next/navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const pathName = usePathname();
  
  const hidePath = ['/admin/dashboard','/landlord/dashboard'].includes(pathName);

  return (
    <html lang="en">
      <GlobalProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       {!hidePath && <Header />} 
        {children}
        {!hidePath && <Footer />}
      </body>
      </GlobalProvider>
    </html>
  );
}
