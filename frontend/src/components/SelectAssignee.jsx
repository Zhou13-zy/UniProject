import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import styles from '../App.module.css';
import { apiCall } from '../utils/ApiCalls';

export default function SelectAssignee({assigneesList, assignee, setAssignedTo}) {
  const [curAssigneeName, setCurAssigneeName] = React.useState('');

  const assignees = [{value: assignee, label: curAssigneeName}];

  const headers = {
    'Accept': 'application/json',
  }

  const getName = async () => {
    const data = await apiCall('GET', headers, {}, `user?userId=${assignee}`);
    setCurAssigneeName(data.firstName + ' ' + data.lastName);
  }

  assigneesList && assigneesList
    .filter((option) => option.userId !== assignee)
    .map((option) => (
      assignees.push({ value: option.userId, label: `${option.firstName + ' ' + option.lastName}`})
    ))
  const handleChange = (event) => {
    setAssignedTo(parseInt(event.target.value, 10));
  };

  React.useEffect(() => {
    getName();
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.assigneeDropdown}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Assignee
          </InputLabel>
          <NativeSelect
            defaultValue={assignees[0]}
            inputProps={{
              name: 'assignee',
              id: 'uncontrolled-native',
            }}
            onChange={handleChange}
          >
            {
            assignees &&
            assignees.map((user, idx) => (
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

