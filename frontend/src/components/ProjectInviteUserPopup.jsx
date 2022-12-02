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
import SelectInvitee from './SelectInvitee';
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

export default function ProjectInviteUserPopup({ projectId, connectedUsers, getProjects, getProjectMembers}) {
  const [role, setRole] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [invitee, setInvitee] = React.useState(null);
  const [repeated, setRepeated] = React.useState(false);

  const headers = {
    'Accept': 'application/json',
  }
  
  const checkRepeatMember = async () => {
    const data = await apiCall('GET', headers, {}, `members?projectId=${projectId}`);
    data.map(member => (member.userId === parseInt(invitee, 10)) ? setRepeated(true) : setRepeated(false));
  }
  
  const inviteUser = async () => {
    await apiCall(
      'POST',
      headers,
      {},
      `members?projectId=${projectId}&userId=${invitee}&role=${role}`
    );
    handleClose();
    setTimeout(() => {
      alert('user added to the project');
    }, 1000);
  }
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onclick = () => {
    !repeated ? inviteUser() : alert(`user is already in the project!`);
    getProjects();
  }
    
  React.useEffect(() => {
    checkRepeatMember();
    console.log(invitee)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitee])

  console.log(repeated)
  return (
    <div>
      <MDBBtn outline color="dark" floating size="sm" onClick={handleOpen} className='mx-2'>
        <MDBIcon fas icon="plus" />
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
              <strong>Invite user to project</strong>
            </Typography>
            <AuthTextInput type="text" label="Role" size='small' fullWidth margin='normal' required
              value={role}
              onChange={(e) => setRole(e.target.value)}
            /><br />
            <SelectInvitee assigneesList={connectedUsers} setInvitee={setInvitee} />
            <div className={styles.rightButton}>
              <Button
                variant="outlined"
                color="primary"
                onClick={onclick}
              >
                ADD
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
