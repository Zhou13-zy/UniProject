import React from 'react';
import {
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBBtn,
  MDBTypography,
  MDBIcon
} from 'mdb-react-ui-kit';
import ProjectInviteUserPopup from './ProjectInviteUserPopup';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/ApiCalls';
import ProjectDeleteUserPopup from './ProjectDeleteUserPopup';
import AlertDialogDelProject from './AlertDialogDelProject';

export default function ProjectCardAuth({project, idx, getProjects, connectedUsers}) {
  const navigate = useNavigate();
  const [ownerName, setOwnerName] = React.useState('');
  const [isOwner, setIsOwner] = React.useState(false);
  const [members, setMembers] = React.useState([]);
  const projectId = project.projectId;
  const userId = parseInt(localStorage.getItem('userId'), 10);
  const headers = {
		'Accept': 'application/json',
	}

  const getName = async () => {
    const data = await apiCall('GET', headers, {}, `user?userId=${project.projectOwner}`);
    setOwnerName(data.firstName + ' ' + data.lastName);
  }

  const getProjectMembers = async () => {
    const data = await apiCall('GET', headers, {}, `members?projectId=${projectId}`);
    setMembers(data);
  }

  const deleteProject = async (projectId) => {
    await apiCall('DELETE', headers, {}, `project?projectId=${projectId}`);
    await getProjects();
  }

  React.useEffect(() => {
    userId === project.projectOwner && setIsOwner(true);
    getName();
    getProjectMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MDBCard className="mb-5 bg-info bg-gradient bg-opacity-50" idx={idx} style={{
      borderRadius: '25px'
    }}
    >
        <MDBCardBody className="p-4">
          <MDBTypography tag='h3'>{project.projectName}</MDBTypography>
          <MDBCardText className="small">
          <MDBIcon fas icon="project-diagram" size='lg'/>
            <span className="mx-2">|</span> Created by <strong>{ownerName}</strong> on {project.createdTime}
          </MDBCardText>
          <hr className="my-4" />

          <div className="d-flex justify-content-end align-items-center">
            {
              isOwner
              &&
              <div className='d-flex justify-content-between align-items-center'>
                <ProjectInviteUserPopup projectId={projectId} connectedUsers={connectedUsers} getProjects={getProjects} getProjectMembers={getProjectMembers} members={members}/>
                <ProjectDeleteUserPopup projectId={projectId} getProjects={getProjects} getProjectMembers={getProjectMembers} members={members}/>
                <span className="ms-3 me-4">|</span>
              </div>
            }
            {
              isOwner
              &&
              <AlertDialogDelProject deleteProject={deleteProject} projectId={projectId}/>
            }
            <MDBBtn size="lg" onClick={() => {navigate(`/dashboard/${projectId}`)}}>
              View
            </MDBBtn>
          </div>

        </MDBCardBody>
    </MDBCard>
  );
}