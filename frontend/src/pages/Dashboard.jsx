import React from 'react';
import { apiCall } from '../utils/ApiCalls.jsx';
import styles from '../App.module.css';
import {
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBTypography,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { Grid } from '@mui/material';
import Column from '../components/Column';
import { useParams } from 'react-router-dom';
import { UnAuthRedirect } from '../utils/UnAuthRedirect';
import NewTaskPopup from '../components/NewTaskPopup';
import ProfileHeader from '../components/ProfileHeader';
import ProjectInviteUserPopup from '../components/ProjectInviteUserPopup.jsx';
import UserCardPopupAvatar from '../components/UserCardPopupAvatar.jsx';
import ProjectDeleteUserPopup from '../components/ProjectDeleteUserPopup.jsx';

export function Dashboard () {
	UnAuthRedirect();
  const { projectId } = useParams();
	const [taskData, setTaskData] = React.useState([]);
	const [projectData, setProjectData] = React.useState({});
  const [isOwner, setIsOwner] = React.useState(false);
  const [members, setMembers] = React.useState([]);
  const [ownerName, setOwnerName] = React.useState('');
	const [connectedUsers, setConnectedUsers] = React.useState([]);
	const headers = {
		'Accept': 'application/json',
	}
	const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : 0;
  const firstName = localStorage.getItem('firstName') ? localStorage.getItem('firstName') : '';
  const lastName = localStorage.getItem('lastName') ? localStorage.getItem('lastName') : '';

	const intUserId = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId'), 10) : 0;

	const getName = async (userId) => {
		const data = await apiCall('GET', headers, {}, `user?userId=${userId}`);
		setOwnerName(data.firstName + ' ' + data.lastName);
	}

	const getTasks = async () => {
		const data = await apiCall('GET', headers, {}, `task/getall?projectId=${projectId}`);
		setTaskData(data);
	}

	const getProjectDetails = async () => {
		const data = await apiCall('GET', headers, {}, `project?projectId=${projectId}`);
		getName(data.projectOwner);
		setProjectData(data);
		(intUserId === data.projectOwner) && setIsOwner(true);
	}

	const getProjectMembers = async () => {
		const data = await apiCall('GET', headers, {}, `members?projectId=${projectId}`);
		setMembers(data);
	}

	const getAllConnectedUsers = async () => {
		const data = await apiCall('GET', headers, {}, `connection?userId=${userId}`);
		setConnectedUsers(data);
	}

	React.useEffect(() => {
		getTasks();
		getAllConnectedUsers();
		getProjectDetails();
		getProjectMembers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return(
		<div className={styles.dashboard}>
			<ProfileHeader firstname={firstName} lastname={lastName}/>
			<MDBCard
				className="mb-5 bg-primary bg-gradient bg-opacity-10"
				style={{ borderRadius: '25px'}}
			>
				<MDBCardBody className="p-4">
					<MDBTypography tag='h3' className='text-center mb-4'>{projectData.projectName}</MDBTypography>
					<MDBCardText className="small text-center">
						<MDBIcon fas icon="project-diagram" size='lg'/>
						<span className="mx-2">|</span> Created by <strong>{ownerName}</strong> on {projectData.createdTime}
					</MDBCardText>
					<hr className="my-4" />
					<div className="d-flex justify-content-between align-items-center">
						<div className="d-flex align-items-center">
							<MDBCardText className="text-uppercase mb-0">
								<MDBIcon fas icon="file-alt ms-4 me-2" /> <span className="text-muted small">{projectData.projectDescription}</span>
							</MDBCardText>
						</div>
						<div className="d-flex justify-content-end align-items-center">
								{
									members.map(function (member, idx) {
										return <UserCardPopupAvatar user={member} key={idx} />
									})
								}
								{
									isOwner
									&&
									<div className='d-flex justify-content-start align-items-center'>
										<ProjectInviteUserPopup projectId={projectId} connectedUsers={connectedUsers} getProjects={getProjectDetails} getProjectMembers={getAllConnectedUsers} members={connectedUsers}/>
										<ProjectDeleteUserPopup projectId={projectId} getProjects={getProjectDetails} getProjectMembers={getProjectMembers} members={members} />
									</div>
								}
								<span className="ms-3 me-4">|</span>
								<NewTaskPopup getTasks={getTasks} assigneesList={members} projectId={parseInt(projectId, 10)}/>
							</div>
					</div>
				</MDBCardBody>
			</MDBCard>
			<div>
				<Grid
					container
					spacing={5}
					direction="column"
					alignItems="center"
					justifyContent="center"
					style={{ minHeight: '50vh' }}
				>

					<Grid
						container
						spacing={2}
						direction="row"
						justifyContent="center"
					>
						<Grid item columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
							<Column
								itemList={
									!taskData.api_response
									&&
									taskData.filter(task => task.status === 'Not Started')
								}
								colTitle='Not Started'
								color='orange'
								getTasks={getTasks}
								members={members}
							/>
						</Grid>
						<Grid item columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
							<Column
								itemList={
									!taskData.api_response
									&&
									taskData.filter(task => task.status === 'In Progress')
								}
								colTitle='In Progress'
								color='purple'
								getTasks={getTasks}
								members={members}
							/>
						</Grid>
						<Grid item columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
							<Column
								itemList={
									!taskData.api_response
									&&
									taskData.filter(task => task.status === 'Blocked')
								}
								colTitle='Blocked'
								color='red'
								getTasks={getTasks}
								members={members}
							/>
						</Grid>
						<Grid item columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
							<Column
								itemList={
									!taskData.api_response
									&&
									taskData.filter(task => task.status === 'Completed')
								}
								colTitle='Completed'
								color='green'
								getTasks={getTasks}
								members={members}
							/>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}