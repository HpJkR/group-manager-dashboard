import React from 'react';
import {Autocomplete, TextField} from '@mui/material';

interface ClassOption {
  label: string;
  id: number;
}

interface ClassSelectorProps {
  options: ClassOption[];
  onChange: (event: React.ChangeEvent<{}>, value: ClassOption[]) => void;
}

const ClassSelector: React.FC<ClassSelectorProps> = ({options, onChange}) => (
  <Autocomplete
    multiple
    options={options}
    getOptionLabel={(option) => option.label}
    onChange={onChange}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Select Classes"
        variant="outlined"
        fullWidth
      />
    )}
  />
);

export default ClassSelector;
