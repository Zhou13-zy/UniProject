import React, { useState, useEffect } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { UnAuthRedirect } from '../utils/UnAuthRedirect.js';
import styles from '../App.module.css';
import ProfileHeader from '../components/ProfileHeader';
import { useParams, useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/ApiCalls';
import { UserCardUnauth } from '../components/UserCardUnauth';
import ProjectCardUnauth from '../components/ProjectCardUnauth';
import TaskCardUnauth from '../components/TaskCardUnauth';
import AlertDialogDisconnect from '../components/AlertDialogDisconnect';
import AvatarUserProfile from '../components/AvatarUserProfile.jsx';

export default function ProfileConnectedUser() {
	UnAuthRedirect();
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userDetail, setUserDetail] = useState({});
  const [taskData, setTaskData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [capacity, setCapacity] = useState('');
  const [workload, SetWorkload] = useState('');
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const loggedUserId = localStorage.getItem('userId');
  const firstName = localStorage.getItem('firstName') ? localStorage.getItem('firstName') : '';
  const lastName = localStorage.getItem('lastName') ? localStorage.getItem('lastName') : '';
  const headers = {
		'Accept': 'application/json',
	}

  const getUserDetails = async () => {
    const data = await apiCall('GET', headers, {}, `user?userId=${userId}`)
    setUserDetail(data);
    setFirstname(data.firstName);
    setLastname(data.lastName);
  }

  const getProjects = async () => {
    const data = await apiCall('GET', headers, {}, `project/getall?userId=${userId}`);
    setProjectData(data);
  }

  const getTasks = async () => {
    const data = await apiCall('GET', headers, {}, `task/getall?userId=${userId}`);
    setTaskData(data);
  }

  const getAllConnectedUsers = async () => {
    const data = await apiCall('GET', headers, {}, `connection?userId=${userId}`);
    setConnectedUsers(data);
  }

  const getUserCapacity = async () => {
    const data = await apiCall('GET', headers, {}, `user?userId=${userId}`)
    setCapacity(data.capacity);
  }

  const cancelConnection = async () => {
    await apiCall('DELETE', headers, {}, `connection?userId=${loggedUserId}&connectedUserId=${userId}`);
    navigate('/profile');
  }

  const getWorkload = async (userId) => {
    const data = await apiCall('GET', headers, {}, `workload?userId=${userId}`);
    SetWorkload(data.workload);
  }

  useEffect(() => {
    getTasks();
    getAllConnectedUsers();
    getProjects();
    getUserDetails();
    getUserCapacity();
    getWorkload(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <section className={styles.profileBody}>
        <ProfileHeader firstname={firstName} lastname={lastName}/>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4 bg-primary bg-gradient bg-opacity-10">
                <MDBCardBody className="text-center">
                  <MDBCardText className="text-center mb-4"><strong className="h2 text-primary font-italic me-1">{`${(firstname + ' ' + lastname).toUpperCase()}'s Profile`}</strong></MDBCardText>
                  <AvatarUserProfile firstname={firstname} lastname={lastname}/>
                  <hr className="my-4" />
                  <div className="d-flex justify-content-center mb-2">
                    <AlertDialogDisconnect cancelConnection={cancelConnection} userDetail={userDetail} />
                  </div>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 bg-primary bg-gradient bg-opacity-10">
                <MDBCardBody>
                    <MDBCardText className="text-center mb-4"><MDBIcon fas icon="user-check" style={{ color: '#55acee' }} />&nbsp;&nbsp;<span className="text-primary font-italic me-1">Connected Users</span></MDBCardText>
                    {
                      !connectedUsers.api_response
                      &&
                      connectedUsers.map(function (connectedUser, idx) {
                        return <UserCardUnauth user={connectedUser} key={idx} getProjects={getProjects} />
                      })
                    }
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 bg-primary bg-gradient bg-opacity-10">
                <MDBCardBody>
                  <MDBCardText className="text-center mb-4"><span className="text-body h4 font-italic me-1">Assigned Tasks</span></MDBCardText>
                  <div>
                    {
                      !taskData.api_response
                      &&
                      taskData
                        .filter((task) => task.dueDate !== null)
                        .sort((task1, task2) => task1.dueDate.localeCompare(task2.dueDate))
                        .map(function(task, idx) {
                        return <TaskCardUnauth task={task} key={idx} idx={idx} getTasks={getTasks} connectedUsers={connectedUsers}/>
                      })
                    }
                    {
                      !taskData.api_response
                      &&
                      taskData
                        .filter((task) => !task.dueDate)
                        .map(function(task, idx) {
                        return <TaskCardUnauth task={task} key={idx} idx={idx} getTasks={getTasks} connectedUsers={connectedUsers}/>
                      })
                    }
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4 bg-primary bg-gradient bg-opacity-10">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted"><strong>{userDetail.firstName + ' ' + userDetail.lastName}</strong></MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userDetail.email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
              <MDBRow>
                <MDBCol>
                  <MDBCard className="mb-4 bg-primary bg-gradient bg-opacity-25">
                    <MDBCardBody className='pb-0 d-flex flex-column justify-content-center align-items-center'>
                      <MDBCardText className="d-flex justify-content-between align-items-center mb-1"><span className="text-body h4 font-italic me-1">Workload</span></MDBCardText>
                      <MDBCardText className="d-flex justify-content-between align-items-center mb-4"><span className="text-body h4 font-italic me-1">{workload ? `${workload}%`: 'N/A'}</span></MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol>
                  <MDBCard className="mb-4 bg-info bg-gradient bg-opacity-25">
                    <MDBCardBody className='pb-0 d-flex flex-column justify-content-center align-items-center'>
                      <MDBCardText className="d-flex justify-content-between align-items-center mb-1"><span className="text-body h4 font-italic me-1">Weekly Capacity</span></MDBCardText>
                      <MDBCardText className="d-flex justify-content-between align-items-center mb-4"><span className="text-body h4 font-italic me-1">{capacity} hours</span></MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
              <MDBCard className="mb-4 bg-primary bg-gradient bg-opacity-10">
                <MDBCardBody className='pb-0'>
                  <MDBCardText className="text-center mb-4"><span className="text-body h4 font-italic me-1">Projects</span></MDBCardText>
                  {
                    !projectData.api_response
                    &&
                    projectData
                      .filter(project => project.projectId !== 1)
                      .map(function (project, idx) {
                      return <ProjectCardUnauth project={project} key={idx} idx={idx} getProjects={getProjects} connectedUsers={connectedUsers} />
                    })
                  }
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}