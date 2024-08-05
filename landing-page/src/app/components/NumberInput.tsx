import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {styled} from '@mui/material/styles';
import TextField, {TextFieldProps} from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

const StyledInputRoot = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
}));

const StyledTextField = styled(TextField)(({theme}) => ({
  '& input': {
    textAlign: 'center',
    padding: theme.spacing(1),
  },
}));

const NumberInput = React.forwardRef<HTMLDivElement, TextFieldProps>(function CustomNumberInput(
  props,
  ref,
) {
  return (
    <StyledInputRoot ref={ref}>
      <IconButton
        onClick={() => {
          const currentValue = parseInt(props.value as string, 10) || 1;
          props.onChange?.({target: {value: (currentValue - 1).toString()}} as React.ChangeEvent<HTMLInputElement>);
        }}
      >
        <RemoveIcon fontSize="small"/>
      </IconButton>
      <StyledTextField
        {...props}
        type="number"
        inputProps={{min: "1", 'aria-label': 'number input'}}
        variant="outlined"
      />
      <IconButton
        onClick={() => {
          const currentValue = parseInt(props.value as string, 10) || 1;
          props.onChange?.({target: {value: (currentValue + 1).toString()}} as React.ChangeEvent<HTMLInputElement>);
        }}
      >
        <AddIcon fontSize="small"/>
      </IconButton>
    </StyledInputRoot>
  );
});

export default NumberInput;
