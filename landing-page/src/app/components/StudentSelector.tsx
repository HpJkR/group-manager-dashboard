import React from 'react';
import {Autocomplete, TextField} from '@mui/material';

interface StudentOption {
  label: string;
  id: number;
  classId: number;
}

interface StudentSelectorProps {
  options: StudentOption[];
  selected: string[];
  onChange: (event: React.ChangeEvent<{}>, value: StudentOption[]) => void;
}

const StudentSelector: React.FC<StudentSelectorProps> = ({options, selected, onChange}) => (
  <Autocomplete
    multiple
    options={options}
    getOptionLabel={(option) => option.label}
    value={options.filter(option => selected.includes(option.label))}
    onChange={onChange}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Select Students"
        variant="outlined"
        fullWidth
      />
    )}
  />
);

export default StudentSelector;
