import { ReactNode } from "react";
import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Houdini",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
