import React from 'react';
import {IconButton} from '@mui/material';
import {Brightness4, Brightness7} from '@mui/icons-material';
import {useTheme} from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const {isDarkMode, toggleTheme} = useTheme();

  return (
    <IconButton onClick={toggleTheme} color="inherit" className="rounded-full">
      {isDarkMode ? <Brightness7 sx={{color: 'white'}}/> : <Brightness4 sx={{color: 'white'}}/>}
    </IconButton>
  );
};

export default ThemeToggle;
