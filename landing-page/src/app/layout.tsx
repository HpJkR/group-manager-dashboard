import React from 'react';
import {Metadata} from 'next';
import './globals.css';
import Sidebar from './navigation/Sidebar';
import {Inter} from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Group manager',
  description: 'Generate random groups for your class or team!',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body className={inter.className}>

    <ToastContainer/>
    <div className="flex h-screen w-full flex-col md:flex-row md:overflow-hidden">
      <Sidebar/>
      <div className="w-full">
        {children}
      </div>
    </div>
    </body>
    </html>
  );
}