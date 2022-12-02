import React from 'react';
import {
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBBtn,
  MDBTypography,
  MDBIcon
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export default function ForumCard() {
  const navigate = useNavigate();

  return (
    <MDBCard className="mb-5 bg-warning bg-gradient bg-opacity-10" style={{ 
      borderRadius: '25px'
    }}
    >
			<MDBCardBody className="p-4 d-flex flex-row justify-content-between align-items-center">
				<MDBCardText className="small d-flex flex-row justify-content-around align-items-center ">
					<MDBIcon fas icon="project-diagram" size='lg' className='mx-3'/>
					<span className="mx-2">|</span> 
					<MDBTypography tag='h3' className='mx-3'>Public Forum</MDBTypography>
				</MDBCardText>
				<div className="align-items-center">
					<MDBBtn size="lg" onClick={() => {navigate(`/dashboard/1`)}}>
						View
					</MDBBtn>
				</div>
			</MDBCardBody>
    </MDBCard>
  );
}