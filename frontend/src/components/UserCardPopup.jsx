import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { Button, Fade } from '@mui/material';
import { apiCall } from '../utils/ApiCalls';
import AvatarProfile from './AvatarProfile';

export default function UserCardPopup({user}) {
	const intUserId = parseInt(localStorage.getItem('userId'), 10);
	const [open, setOpen] = React.useState(false);
	const [btnActive, setBtnActive] = React.useState(true);
	const [connected, setConnected] = React.useState(false);
	const [userTaskNum, setUserTaskNum] = React.useState(0);
	const [userProjectNum, setUserProjectNum] = React.useState(0);
	const [workload, setWorkload] = React.useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
	const headers = {
		'Accept': 'application/json',
	}
	const userId = parseInt(localStorage.getItem('userId'), 10);
	const navigate = useNavigate();

	const sendRequest = async () => {
		await apiCall('POST', headers, {}, `request?requestTo=${user.email}&requestFrom=${userId}`);
		alert('Request Sent!');
	}

	const checkRequested = async () => {
		const data = await apiCall('GET', headers, {}, `request?userId=${user.userId}`);
		!data.api_response
		&&
		data.map(request =>
			request.requestFrom === userId
			&&
			setBtnActive(false)
		)
	}

	const checkConnected = async () => {
		const data = await apiCall('GET', headers, {}, `connection?userId=${userId}&connectedUserId=${user.userId}`);
		data.length > 0 && setConnected(true);
	}

	const getUserTaskNum = async () => {
		const data = await apiCall('GET', headers, {}, `task/getall?userId=${user.userId}`);
		setUserTaskNum(data.length);
	}

	const getUserProjectNum = async () => {
		const data = await apiCall('GET', headers, {}, `project/getall?userId=${user.userId}`);
		setUserProjectNum(data.length);
	}

	const getWorkload = async () => {
		const data = await apiCall('GET', headers, {}, `workload?userId=${user.userId}`);
		setWorkload(data.workload);
	}

	const btnClick = () => {
		sendRequest();
		setBtnActive(false);
	}

	React.useEffect(() => {
		checkConnected();
		checkRequested();
		getUserTaskNum();
		getUserProjectNum();
		getWorkload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ backgroundColor: '#eee' }}>
			<Button onClick={handleOpen} fullWidth>
				<MDBCard className="mb-4">
					<MDBCardBody>
						<MDBRow>
							<MDBCol sm="3">
								<MDBIcon fas icon="user-tie" />
							</MDBCol>
							<MDBCol sm="9">
								<MDBCardText className="text-muted">{user.firstName+ ' ' +user.lastName}</MDBCardText>
							</MDBCol>
						</MDBRow>
					</MDBCardBody>
				</MDBCard>
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
					<MDBContainer className="container py-5 h-100">
						<MDBRow className="justify-content-center align-items-center h-100">
							<MDBCol md="12" xl="4">
								<MDBCard style={{ borderRadius: '15px' }}>
									<MDBCardBody className="text-center">
										<div className="mt-3 mb-4">
											<MDBBtn floating>
												<AvatarProfile firstname={user.firstName} lastname={user.lastName}/>
											</MDBBtn>
										</div>
										<MDBTypography tag="h4">{user.firstName + ' ' + user.lastName}</MDBTypography>
										<MDBCardText className="text-muted mb-4">
											{user.email} <span className="mx-2">|</span> <a href="#!">Peera</a>
										</MDBCardText>
										{
											(connected===true || user.userId===intUserId)
											?
											<div className="mb-4 pb-2">
												<MDBBtn outline floating
													onClick={() => navigate(`/profile/${user.userId}`)}
												>
													<MDBIcon fas icon="user-circle" size='lg'/>
												</MDBBtn>
											</div>
											:
											<Button
												onClick={btnClick}
												color={btnActive ? 'primary' : 'secondary'}
												disabled={!btnActive}
											>
												{btnActive ? 'Connect' : 'Pending'}
											</Button>
										}

										<div className="d-flex justify-content-between text-center mt-5 mb-2">
											<div>
												<MDBCardText className="mb-1 h5">{userProjectNum}</MDBCardText>
												<MDBCardText className="small text-muted mb-0">Projects</MDBCardText>
											</div>
											<div className="px-3">
												<MDBCardText className="mb-1 h5">{userTaskNum ?? '0'}</MDBCardText>
												<MDBCardText className="small text-muted mb-0">Tasks</MDBCardText>
											</div>
											<div>
												<MDBCardText className="mb-1 h5">{workload ? `${workload}%`: 'N/A'}</MDBCardText>
												<MDBCardText className="small text-muted mb-0">Workload</MDBCardText>
											</div>
										</div>
									</MDBCardBody>
								</MDBCard>
							</MDBCol>
						</MDBRow>
					</MDBContainer>
				</Fade>
			</Modal>
    </div>
  );
}