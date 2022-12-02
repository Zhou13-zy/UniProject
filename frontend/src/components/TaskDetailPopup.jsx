import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { apiCall } from '../utils/ApiCalls';
import TaskTab from './TaskTab';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '10%',
  boxShadow: 24,
  p: 4,
};

export default function TaskDetailPopup({ task }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  const [taskCreator, setTaskCreator] = React.useState('');
  const [taskAssignee, setTaskAssignee] = React.useState('');
  const [projectName, setProjectName] = React.useState('');
  const headers = {
		'Accept': 'application/json',
	}
  const getTaskCreator = async () => {
    const data = await apiCall('GET', headers, {}, `user?userId=${task.createdBy}`);
    const name = data.firstName + ' ' + data.lastName;
    setTaskCreator(name);
  }
  const getTaskAssignee = async () => {
    const data = await apiCall('GET', headers, {}, `user?userId=${task.assignedTo}`);
    const name = data.firstName + ' ' + data.lastName;
    setTaskAssignee(name);
  }
  const getProjectName = async () => {
    const data = await apiCall('GET', headers, {}, `project?projectId=${task.projectId}`);
    setProjectName(data.projectName);
  }

  React.useEffect(() => {
    getTaskCreator();
    getTaskAssignee();
    getProjectName();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
  return (
    <div>
      <Button onClick={handleOpen} className="bg-primary bg-gradient bg-opacity-50 text-white">Details</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className='bg-warning bg-gradient bg-opacity-90'>
            <div className='d-flex flex-row justify-content-center align-items-center'>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <strong>Task ID:</strong> {task.taskId}
              </Typography>
            </div>
						<Card className='bg-light bg-gradient bg-opacity-50'>
							<CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" gutterBottom>
                      Task Title:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2" gutterBottom>
                      {task.title}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" gutterBottom>
                      Project Title:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2" gutterBottom>
                      {projectName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" gutterBottom>
                      Task Description:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2" gutterBottom>
                      {task.summary}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" gutterBottom>
                      Due Date:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2" gutterBottom>
                      {task.dueDate}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" gutterBottom>
                      Created by:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2" gutterBottom>
                      {taskCreator}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" gutterBottom>
                      Assignee:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2" gutterBottom>
                      {taskAssignee}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" gutterBottom>
                      Status:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2" gutterBottom>
                      {task.status}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" gutterBottom>
                    Created at:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2" gutterBottom>
                      {task.createdTime}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" gutterBottom>
                      Updated at:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2" gutterBottom>
                      {task.updatedTime}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" gutterBottom>
                      Effort:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2" gutterBottom>
                      {task.effort} hr(s)
                    </Typography>
                  </Grid>
                </Grid>
							</CardContent>
						</Card>
            <div className='d-flex justify-content-center align-items-center'>
              <TaskTab taskId={task.taskId} assignee={task.assignedTo}/>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
