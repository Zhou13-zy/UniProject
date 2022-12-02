import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { apiCall } from '../utils/ApiCalls';
import { NotificationCard } from './NotificationCard';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function NotificationPopup() {
	const [requests, setRequests] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
	const userId = localStorage.getItem('userId');

  const headers = {
		'Accept': 'application/json',
	}

	const getRequests = async () => {
		const data = await apiCall('GET', headers, {}, `request?userId=${userId}`);
		setRequests(data);
	}

	const acceptRequest = async (request) => {
		await apiCall('PUT', headers, {}, `request?requestId=${request.requestId}&status=approved`);
		await getRequests();
	}

	const ignoreRequest = async (request) => {
		await apiCall('PUT', headers, {}, `request?requestId=${request.requestId}&status=ignore`);
		await getRequests();
	}

	React.useEffect(() => {
		getRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
  return (
    <div>
      <MDBBtn floating size="sm" onClick={handleOpen}>
        <MDBIcon size='2xl' fas icon="far fa-bell" />
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
					<Box sx={style} >
						<Typography align='center' id="transition-modal-title" variant="h5" className="mb-4 text-dark"
						>
							New Connection Requests
						</Typography>
						<Box
							className="mt-4 bg-info bg-gradient bg-opacity-10"
							sx={{
								bgcolor: 'background.paper',
								boxShadow: 24,
							}}
						>
							{
								!requests.api_response
								&&
								requests.map(function (request, idx) {
									return <NotificationCard request={request} key={idx} acceptRequest={acceptRequest} ignoreRequest={ignoreRequest}/>
								})
							}
						</Box>
					</Box>
        </Fade>
      </Modal>
    </div>
  );
}
