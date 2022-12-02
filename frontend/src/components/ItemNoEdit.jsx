import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { apiCall } from '../utils/ApiCalls.jsx';
import AlertDialogDelTask from './AlertDialogDelTask.jsx';
import TaskDetailPopup from './TaskDetailPopup.jsx';

function ItemNoEdit({ idx, task, color, getTasks }) {
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
						<strong>Project:</strong> {projectName}
					</Typography>
					<Typography variant="body2">
						<strong>Due Date:</strong> {task.dueDate}
					</Typography>
				</CardContent>
				<CardActions className='bg-secondary bg-gradient bg-opacity-50 justify-content-around'>
					<AlertDialogDelTask deleteTask={deleteTask} taskId={task.taskId} />
					<TaskDetailPopup task={task}/>
				</CardActions>
			</Card>
		</Box>

	)
}

export default ItemNoEdit;
