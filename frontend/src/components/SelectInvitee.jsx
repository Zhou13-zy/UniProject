import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import styles from '../App.module.css';

export default function SelectInvitee({assigneesList, setInvitee}) {
  const invitees = [{ value: 0, label: ' '}];

  assigneesList && assigneesList.map((option) => (
    invitees.push({ value: option.connectedUserId, label: `${option.firstName + ' ' + option.lastName}`})
  ))

  const handleChange = (event) => {
    setInvitee(event.target.value, 10);
  };

  return (
    <div className={styles.assigneeDropdown}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Invite from connected user:
          </InputLabel>
          <NativeSelect
            inputProps={{
              name: 'invitee',
              id: 'uncontrolled-native',
            }}
            onChange={handleChange}
          >
            {
            invitees &&
            invitees.map((user, idx) => (
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

