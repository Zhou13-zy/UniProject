import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { apiCall } from '../utils/ApiCalls.jsx';
import TaskDetailPopup from './TaskDetailPopup.jsx';
import AlertDialogDelTask from './AlertDialogDelTask.jsx';

export default function TaskCard({ task, idx, getTasks}) {
  const [projectName, setProjectName] = React.useState('');
  const headers = {
		'Accept': 'application/json',
	}
  
  const deleteTask = async (taskId) => {
    await apiCall('DELETE', headers, {}, `task?taskId=${taskId}`);
    await getTasks();
  }

  const getProjectName = async () => {
    const data = await apiCall('GET', headers, {}, `project?projectId=${task.projectId}`);
    setProjectName(data.projectName);
  }

  React.useEffect(() => {
    getProjectName();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

  return (
    <Box
      sx={{
        padding: '2%',
        minWidth: 300
      }}
      key={idx}
    >
      <Card className='bg-info bg-gradient bg-opacity-25'>
        <CardContent>
          <Grid container spacing={2} display="flex" flexDirection='column'>
            <Grid item xs={7}>
              <Typography color="text.secondary">
                Task ID: <strong>{task.taskId}</strong>
              </Typography>
            </Grid>
            <Grid item xs={20}>
            <Typography color="text.secondary">
              Project: <strong>{projectName}</strong> 
            </Typography>
            </Grid>
          </Grid>
          <hr className="my-4" />
          <Typography variant="h5" component="div" gutterBottom>
            {task.title}
          </Typography>
          <Typography variant="body2" display="flex" justifyContent="flex-end" mt={5}>
            Due Date: {task.dueDate}
          </Typography>
        </CardContent>
        <CardActions className='bg-light bg-gradient bg-opacity-50 justify-content-around'>
          <AlertDialogDelTask deleteTask={deleteTask} taskId={task.taskId} />
          <TaskDetailPopup task={task}/>
        </CardActions>
      </Card>
    </Box>
  );
}