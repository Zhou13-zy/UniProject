import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import styles from '../App.module.css';
import AuthTextInput from './styled/AuthTextInput';
import { apiCall } from '../utils/ApiCalls';

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

export default function NewProjectPopup ({ getProjects }) {
  const current = new Date();
  const [projectName, setProjectName] = React.useState('');
  const [projectDescription, setProjectDescription] = React.useState('');
  const projectId = 0;
	const projectOwner = parseInt(localStorage.getItem('userId'), 10);
  const createdTime = current.toISOString().split('T')[0];

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  const createProject = async () => {
    await apiCall(
      'POST',
			headers,
			{
				projectId,
				projectName,
				projectDescription,
				projectOwner,
				createdTime
			},
			'project'
		)
		handleClose();
		getProjects();
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant='contained'
    >
            New Project
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
              <strong>Create New Project</strong>
            </Typography>
            <AuthTextInput type="text" label="Title" size='small' fullWidth margin='normal' required
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
            /><br />
            <AuthTextInput type="text" label="Description" fullWidth size='small' margin='normal' required
              value={projectDescription}
              onChange={e => setProjectDescription(e.target.value)}
            /><br />
            <div className={styles.rightButton}>
              <Button
                variant="outlined"
                color="primary"
                onClick={createProject}
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
