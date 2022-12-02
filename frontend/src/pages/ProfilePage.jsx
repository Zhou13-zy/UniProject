import React, { useState, useEffect } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBBtn,
} from 'mdb-react-ui-kit';
import appLogo from "../assets/Peera2.png";
import styles from '../App.module.css';
import ProfileHeader from '../components/ProfileHeader';
import NewProjectPopup from '../components/NewProjectPopup';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import { apiCall } from '../utils/ApiCalls';
import ProjectCardAuth from '../components/ProjectCardAuth';
import { UserCardAuth } from '../components/UserCardAuth';
import UpdateCapacityPopup from '../components/UpdateCapacityPopup';
import ForumCard from '../components/ForumCard';
import { UnAuthRedirect } from '../utils/UnAuthRedirect';

export default function ProfilePage() {
	UnAuthRedirect();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [workload, SetWorkload] = useState('');
  const [capacity, setCapacity] = useState('');
  const email = localStorage.getItem('email') ? localStorage.getItem('email') : '';
  const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : 0;
  const firstName = localStorage.getItem('firstName') ? localStorage.getItem('firstName') : '';
  const lastName = localStorage.getItem('lastName') ? localStorage.getItem('lastName') : '';
  const [connectedUserIds, setConnectedUserIds] = useState([parseInt(userId, 10)])

  const headers = {
		'Accept': 'application/json',
	}

  const getTasks = async () => {
    const data = await apiCall('GET', headers, {}, `task/getall?userId=${userId}`);
    setTaskData(data);
  }

  const getProjects = async () => {
    const data = await apiCall('GET', headers, {}, `project/getall?userId=${userId}`);
    setProjectData(data);
  }

  const getAllConnectedUsers = async () => {
    const data = await apiCall('GET', headers, {}, `connection?userId=${userId}`);
    setConnectedUsers(data);
    data.map((user) => (
      !connectedUserIds.includes(user.connectedUserId)
      &&
      connectedUserIds.push(user.connectedUserId)
    ))
    setConnectedUserIds(connectedUserIds);
  }

  const getUserCapacity = async () => {
    const data = await apiCall('GET', headers, {}, `user?userId=${userId}`)
    setCapacity(data.capacity);
  }

  const getWorkload = async (userId) => {
    const data = await apiCall('GET', headers, {}, `workload?userId=${userId}`);
    SetWorkload(data.workload);
  }

  useEffect(() => {
    getTasks();
    getAllConnectedUsers();
    getProjects();
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
                  <MDBCardImage
                    src={appLogo}
                    alt="avatar"
                    style={{ width: '300px', height:'100px' }}
                    fluid
                  />
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 bg-primary bg-gradient bg-opacity-10">
                <MDBCardBody>
                    <MDBCardText className="text-center mb-4"><MDBIcon fas icon="user-check" style={{ color: '#55acee' }} />&nbsp;&nbsp;<span className="text-primary font-italic me-1">Connected Users</span></MDBCardText>
                    {
                      connectedUsers.map(function (connectedUser, idx) {
                        return <UserCardAuth user={connectedUser} key={idx} />
                      })
                    }
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 bg-primary bg-gradient bg-opacity-10" >
                <MDBCardBody className="pt-4">
                  <MDBCardText className="text-center"><span className="text-body h4 font-italic">Assigned Tasks</span></MDBCardText>
                  <div>
                    {
                      !taskData.api_response
                      &&
                      taskData
                        .filter((task) => task.dueDate !== null)
                        .sort((task1, task2) => task1.dueDate.localeCompare(task2.dueDate))
                        .map(function(task, idx) {
                        return <TaskCard task={task} key={idx} idx={idx} getTasks={getTasks} connectedUsers={connectedUsers}/>
                      })
                    }
                    {
                      !taskData.api_response
                      &&
                      taskData
                        .filter((task) => !task.dueDate)
                        .map(function(task, idx) {
                        return <TaskCard task={task} key={idx} idx={idx} getTasks={getTasks} connectedUsers={connectedUsers}/>
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
                      <MDBCardText className="text-muted"><strong>{firstName + ' ' + lastName}</strong></MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
              <MDBRow >
                <MDBCol>
                  <MDBCard className="mb-4 bg-success bg-gradient bg-opacity-25">
                    <MDBCardBody className='pb-0 d-flex flex-column justify-content-center align-items-center'>
                      <MDBCardText className="d-flex justify-content-between align-items-center mb-1"><span className="text-body h4 font-italic me-1">User Kanban Board</span></MDBCardText>
                      <MDBCardText className="d-flex justify-content-between align-items-center mb-4">
                        <MDBBtn onClick={() => {navigate('/dashboard')}} className='bg-primary bg-gradient bg-opacity-25'>View</MDBBtn>
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
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
                      <MDBCardText className="d-flex justify-content-between align-items-center mb-1"><span className="text-body h4 font-italic me-1">Capacity: {capacity} hours</span></MDBCardText>
                        <UpdateCapacityPopup capacity={capacity} setCapacity={setCapacity} getWorkload={getWorkload}/>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
              <ForumCard />
              <MDBCard className="mb-4 bg-primary bg-gradient bg-opacity-10">
                <MDBCardBody className='pb-0'>
                  <MDBCardText className="d-flex justify-content-between align-items-center mb-4"><span className="text-body h4 font-italic me-1">Projects</span><NewProjectPopup getProjects={getProjects}/></MDBCardText>
                  {
                    projectData.length > 1
                    &&
                    projectData
                      .filter(project => project.projectId !== 1)
                      .map(function (project, idx) {
                      return <ProjectCardAuth project={project} key={idx} idx={idx} getProjects={getProjects} connectedUsers={connectedUsers} />
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