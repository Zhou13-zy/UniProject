import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TaskDetailPopup from './TaskDetailPopup.jsx';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import { apiCall } from '../utils/ApiCalls.jsx';

export function TaskCardSearch ({task}) {
	const [assignee, setAssignee] = React.useState('');
  const headers = {
		'Accept': 'application/json',
	}

	const getAssigneeName = async () => {
		const data = await apiCall('GET', headers, {}, `user?userId=${task.assignedTo}`);
		const assigneeFullname = data.firstName + ' ' + data.lastName;
		setAssignee(assigneeFullname);
	}

	React.useEffect(() => {
		getAssigneeName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

  return (
		<>
    <Box
      sx={{
        padding: '2%',
        minWidth: 300
      }}
    >
      <Card className='bg-info bg-gradient bg-opacity-10'>
        <CardContent>
          <Grid container>
            <Grid item>
							<Typography color="text.secondary">
								<mark>Assignee: {assignee}</mark>
							</Typography>
            </Grid>
          </Grid>
          <hr className="my-2" />
          <Typography variant="h5" component="div" gutterBottom>
            {task.title}
          </Typography>
        </CardContent>
        <CardActions className='bg-light bg-gradient justify-content-center'>
          <TaskDetailPopup task={task}/>
        </CardActions>
      </Card>
    </Box>
		</>
	)
}