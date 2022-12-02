import React from 'react';
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBIcon,
	MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export function UserCardAuth ({user}) {
	const navigate = useNavigate();
  return (
		<>
			<MDBCard className="mb-4 bg-info bg-gradient bg-opacity-25">
				<MDBCardBody>
					<MDBRow>
						<MDBCol sm="2">
							<MDBIcon fas icon="user-tie" />
						</MDBCol>
						<MDBCol sm="5">
							<MDBCardText className="text-muted">{user.firstName+ ' ' +user.lastName}</MDBCardText>
						</MDBCol>
						<MDBCol sm="5">
							<MDBBtn
								className="bg-primary bg-gradient bg-opacity-50"
								onClick={() => {navigate(`/profile/${user.connectedUserId}`)}}
							>
								View
							</MDBBtn>
						</MDBCol>
					</MDBRow>
				</MDBCardBody>
			</MDBCard>
		</>
	)
}



