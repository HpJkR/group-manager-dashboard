import React from 'react';
import {Metadata} from 'next';
import './globals.css';
import {ThemeProvider} from './context/ThemeContext';
import Sidebar from './navigation/Sidebar';
import AppolloProvider from '../lib/ApolloProvider';
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
    <ThemeProvider>
      <ToastContainer/>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <Sidebar/>
        <AppolloProvider>
          <div>
            {children}
          </div>
        </AppolloProvider>
      </div>
    </ThemeProvider>
    </body>
    </html>
  );
}