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

export default function UpdateCapacityPopup({capacity, setCapacity, getWorkload}) {
  const userId = localStorage.getItem('userId');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

	const headers = {
		'Accept': 'application/json',
	}

	const updateCapacity = async () => {
		await apiCall('PUT', headers, {}, `capacity?userId=${localStorage.getItem('userId')}&capacity=${capacity}`);
		getWorkload(userId);
	}

	const onclick = () => {
		updateCapacity();
		handleClose();
	}

  return (
    <div>
      <Button onClick={handleOpen} className="bg-success bg-gradient bg-opacity-25 text-white mb-4">Update</Button>
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
              <strong>Update your weekly capacity</strong>
            </Typography>
						<AuthTextInput type='text' label='weekly capacity' size='small' fullWidth required
							value={capacity}
							onChange={(e) => setCapacity(e.target.value)}
						/>
            <div className={styles.rightButton}>
              <Button
                variant="outlined"
                color="primary"
                onClick={onclick}
              >
                submit
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
