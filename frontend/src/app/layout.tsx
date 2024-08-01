import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import Sidebar from './navigation/Sidebar';
import React from "react";
import AppolloProvider from "../lib/ApolloProvider";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Group manager',
  description: 'Generate random groups for your class or team!',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <Sidebar/>
      <AppolloProvider>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </AppolloProvider>

    </div>
    </body>
    </html>
  )
    ;
}
