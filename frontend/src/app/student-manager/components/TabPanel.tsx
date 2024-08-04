import React from 'react';
import {Box} from '@mui/material';

interface TabPanelProps {
  value: number;
  index: number;
  children: React.ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({value, index, children}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box sx={{p: 3, display: 'flex', flexDirection: 'column', gap: '10px'}}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;