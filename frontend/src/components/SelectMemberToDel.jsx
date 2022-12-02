import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import styles from '../App.module.css';

export default function SelectMemberToDel({members, setMemberToDel}) {
  const persons = [{ value: 0, label: ' '}];

  members && members.map((option) => (
    persons.push({ value: option.userId, label: `${option.firstName + ' ' + option.lastName}`})
  ))

  const handleChange = (event) => {
    setMemberToDel(event.target.value, 10);
  };

  return (
    <div className={styles.assigneeDropdown}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Delete project member:
          </InputLabel>
          <NativeSelect
            inputProps={{
              name: 'member',
              id: 'uncontrolled-native',
            }}
            onChange={handleChange}
          >
            {
            persons &&
            persons.map((user, idx) => (
              <option value={user.value} key={idx}>
                {user.label}
              </option>
            ))
            }
          </NativeSelect>
        </FormControl>
      </Box>
    </div>
  );
}

