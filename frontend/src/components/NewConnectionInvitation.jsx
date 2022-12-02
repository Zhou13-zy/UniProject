import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
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

export default function NewConnectionInvitation() {
	const [email, setEmail] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onclick = (e) => {
    e.preventDefault();
		sendRequest();
    handleClose();
  }
	const headers = {
		'Accept': 'application/json',
	}

	const sendRequest = async () => {
		await apiCall('POST', headers, {}, `request?requestTo=${email}&requestFrom=${localStorage.getItem('userId')}`)
		&&
		alert('Request Sent!');
	}

  return (
    <div>
      <MDBBtn floating size="sm" onClick={handleOpen} className='mx-3'>
				<MDBIcon fas icon="user-plus"  size='xl'/>
      </MDBBtn>
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
          <Box sx={style} className="bg-white bg-gradient bg-opacity-90">
            <Typography className="mb-4 text-dark" variant='h5' align='center'
            >
              <strong>Invite user to connect</strong>
            </Typography>
            <AuthTextInput type="email" label="Email" size='small' fullWidth margin='normal' required
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
            <div className={styles.rightButton}>
              <Button
                variant="outlined"
                color="primary"
                onClick={onclick}
              >
                SEND
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
