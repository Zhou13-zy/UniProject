import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import EditTaskPopup from '../components/EditTaskPopup.jsx';
import Typography from '@mui/material/Typography';
import { apiCall } from '../utils/ApiCalls.jsx';
import AlertDialogDelTask from './AlertDialogDelTask.jsx';
import TaskDetailPopup from './TaskDetailPopup.jsx';

function Item({ idx, task, color, getTasks, members }) {
	const headers = {
		'Accept': 'application/json',
	}
  const deleteTask = async (taskId) => {
    await apiCall('DELETE', headers, {}, `task?taskId=${taskId}`);
    await getTasks();
  } 
    return (
			<Box sx={{ minWidth: 275 }} 
				style={{
					borderTop: `4px solid ${color}`,
					margin: '2em',
					borderRadius: '10px'
				 }}
			>
				<Card variant="outlined" key={idx}>
					<CardContent>
						<Typography sx={{ mb: 1.5 }} color="text.secondary">
							Task ID: <strong>{task.taskId}</strong> 
						</Typography>
						<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
							<strong>{task.title}</strong>
						</Typography>
						<Typography variant="body2">
							<strong>Due Date:</strong> {task.dueDate}
						</Typography>
					</CardContent>
					<CardActions className='bg-secondary bg-gradient bg-opacity-50 justify-content-around'>
						<AlertDialogDelTask deleteTask={deleteTask} taskId={task.taskId} />
						<EditTaskPopup task={task} getTasks={getTasks} members={members}/>
						<TaskDetailPopup task={task}/>
					</CardActions>
				</Card>
			</Box>

    )
}

export default Item;
