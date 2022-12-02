import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import styles from '../App.module.css';
import { apiCall } from '../utils/ApiCalls';
import AuthTextInput from './styled/AuthTextInput';
import SelectAssignee from './SelectAssignee';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10%',
  boxShadow: 24,
  p: 4,
};

export default function NewTaskPopup({ getTasks, assigneesList, projectId }) {
  const current = new Date();
  const [title, setTitle] = React.useState('');
  const [summary, setSummary] = React.useState('');
  const [dueDate, setDueDate] = React.useState(current.toISOString().split("T")[0]);
  const [assignedTo, setAssignedTo] = React.useState(parseInt(localStorage.getItem('userId'), 10));
  const [effort, setEffort] = React.useState(1);
  const createdTime = current.toLocaleString();
  const updatedTime = current.toLocaleString();
  const taskId = 0;
  const status = 'Not Started';
  const createdBy = parseInt(localStorage.getItem('userId'), 10);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  const createTask = async () => {
    await apiCall(
      'POST',
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
      'task'
    );
    handleClose();
    getTasks();
  }

  return (
    <div>
      <Button
        variant='outlined'
        color='primary'
        onClick={handleOpen}
        style={{margin:'20px 0px 10px 20px'}}
        sx={{ borderRadius: '30px' }}
      >
       + New Task
      </Button>
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
            <Typography className="mb-4 text-dark" variant="h5" align='center'
            >
              Create New Task
            </Typography>
            <AuthTextInput type="text" label="Title" fullWidth required
              value={title}
              onChange={e => setTitle(e.target.value)}
            /><br />
            <AuthTextInput type="text" label="Description" fullWidth required
              value={summary}
              onChange={e => setSummary(e.target.value)}
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
            <AuthTextInput type="number" label="Effort (in hours)" fullWidth required
              value={parseInt(effort, 10)}
              onChange={e => setEffort(parseInt(e.target.value, 10))}
            /><br />
            <SelectAssignee assigneesList={assigneesList} assignee={assignedTo} setAssignedTo={setAssignedTo} />
            <div className={styles.rightButton}>
              <Button
                variant="outlined"
                color="primary"
                onClick={createTask}
              >
                Create
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}