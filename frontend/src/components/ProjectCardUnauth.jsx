import React from 'react';
import {
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBTypography,
  MDBIcon
} from 'mdb-react-ui-kit';
import { apiCall } from '../utils/ApiCalls';

export default function ProjectCardUnauth({project, idx, getProjects}) {
  const [ownerName, setOwnerName] = React.useState('');
  const headers = {
		'Accept': 'application/json',
	}

  const getName = async () => {
    const data = await apiCall('GET', headers, {}, `user?userId=${project.projectOwner}`);
    setOwnerName(data.firstName + ' ' + data.lastName);
  }

  React.useEffect(() => {
    getName();
    getProjects();
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
        </MDBCardBody>
    </MDBCard>
  );
}