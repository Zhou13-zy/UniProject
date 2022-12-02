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
import { apiCall } from '../utils/ApiCalls';
import SelectMemberToDel from './SelectMemberToDel';

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

export default function ProjectDeleteUserPopup({ projectId, getProjects, getProjectMembers, members }) {
  const [open, setOpen] = React.useState(false);
	const [memberToDel, setMemberToDel] = React.useState(null);
  const headers = {
    'Accept': 'application/json',
  }

  const deleteUser = async () => {
    await apiCall(
      'DELETE',
      headers,
      {},
      `members?projectId=${projectId}&userId=${memberToDel}`
    );
    setTimeout(() => {
      alert('user deleted');
    }, 1000);
		getProjects();
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onclick = () => {
		deleteUser();
    handleClose();
    getProjects();
  }

  React.useEffect(() => {
    getProjectMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberToDel])

  return (
    <div>
      <MDBBtn outline color="dark" floating size="sm" onClick={handleOpen}>
        <MDBIcon fas icon="minus" />
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
          <Box sx={style}>
            <Typography className="mb-4 text-dark" variant="h5" align='center'
            >
              <strong>Delete user from project</strong>
            </Typography>
						<SelectMemberToDel members={members} setMemberToDel={setMemberToDel} />
            <div className={styles.rightButton}>
              <Button
                variant="outlined"
                color="primary"
                onClick={onclick}
              >
                DELETE
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
