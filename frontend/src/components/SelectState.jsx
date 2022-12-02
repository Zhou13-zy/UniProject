import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const states = [
  {
    value: 'Not Started',
    label: 'Not Started',
  },
  {
    value: 'In Progress',
    label: 'In Progress',
  },
  {
    value: 'Blocked',
    label: 'Blocked',
  },
  {
    value: 'Completed',
    label: 'Completed',
  },
];
export default function SelectState({status, setStatus}) {

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          State
        </InputLabel>
        <NativeSelect
          defaultValue={status}
          inputProps={{
            name: 'state',
            id: 'uncontrolled-native',
          }}
          onChange={handleChange}
        >
          {states.map((option, idx) => (
            <option value={option.value} key={idx}>
              {option.label}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}

