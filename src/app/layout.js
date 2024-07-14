import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import SessionWrapper from "./SessionWrapper"
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DMusic",
  description: "An Innovative Music Streaming Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <Navbar/>
          <div className="min-h-[90vh]">
            {children}
          </div>
        </SessionWrapper>
        </body>
    </html>
  );
}
