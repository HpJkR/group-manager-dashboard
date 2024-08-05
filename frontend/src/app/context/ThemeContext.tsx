"use client"

import React, {createContext, useContext, useEffect, useState} from 'react';
import {themeDark, themeLight} from '../../theme';
import {CssBaseline, ThemeProvider as MUIThemeProvider} from '@mui/material';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
      <MUIThemeProvider theme={isDarkMode ? themeDark : themeLight}>
        <CssBaseline/>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
