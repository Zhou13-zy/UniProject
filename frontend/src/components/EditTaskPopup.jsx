import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import styles from '../App.module.css';
import SelectState from './SelectState';
import AuthTextInput from './styled/AuthTextInput';
import { apiCall } from '../utils/ApiCalls';
import SelectAssignee from './SelectAssignee';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '4%',
  boxShadow: 24,
  p: 4,
};

export default function EditTaskPopup({ task, getTasks, members }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const headers = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	}
  
  const [title, setTitle] = React.useState(task.title);
  const [summary, setSummary] = React.useState(task.summary);
  const [effort, setEffort] = React.useState(parseInt(task.effort, 10));
  const [dueDate, setDueDate] = React.useState(task.dueDate);
  const [updatedTime, setUpdatedTime] = React.useState(task.updatedTime);
  const [status, setStatus] = React.useState(task.status);
  const [assignedTo, setAssignedTo] = React.useState(parseInt(task.assignedTo, 10));
  const projectId = task.projectId;
  const taskId = task.taskId;
  const createdBy = task.createdBy;
  const createdTime = task.createdTime;

  React.useEffect(() => {
    const current = new Date();
    setUpdatedTime(current.toLocaleString());
  }, [])
  
  const editTask = async() =>  {
    await apiCall(
      'PUT', 
      headers, 
      {
        taskId,
        projectId,
        title,
        summary,
        status,
        createdBy,
        assignedTo,
        dueDate,
        createdTime,
        updatedTime,
        effort
      }, 
      `task?taskId=${taskId}`
    );
    getTasks();
    handleClose();
  } 

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
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
          <Box sx={style}>
            <div>
              <Typography id="transition-modal-title" variant="h4" component="h1">
                Edit Task
              </Typography>
              <Divider />
              <AuthTextInput type="text" label="Title" fullWidth required 
                value={title}
                onChange={e => setTitle(e.target.value)}
              /><br />
              <AuthTextInput type="text" label="Description" fullWidth required
                value={summary} 
                onChange={e => setSummary(e.target.value)}
              /><br />
              <AuthTextInput type="number" label="Effort" fullWidth required
                value={parseInt(effort, 10)} 
                onChange={e => setEffort(parseInt(e.target.value, 10))}
              /><br />
              <AuthTextInput 
                type="date" 
                label="Deadline" 
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              /><br />
              <SelectAssignee assigneesList={members} assignee={assignedTo} setAssignedTo={setAssignedTo}/>	
              <div className={styles.assigneeDropdown}>
                <SelectState status={status} setStatus={setStatus}/>
              </div>
              <Divider />
              <div className={styles.rightButton}>
                <Button variant="contained" color="success" onClick={editTask}>
                  Submit
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
