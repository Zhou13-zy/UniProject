import React from 'react';
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBIcon,
} from 'mdb-react-ui-kit';

export function UserCardUnauth ({user}) {
  return (
		<>
			<MDBCard className="mb-4 bg-info bg-gradient bg-opacity-25">
				<MDBCardBody>
					<MDBRow>
						<MDBCol sm="4">
							<MDBIcon fas icon="user-tie" />
						</MDBCol>
						<MDBCol sm="7">
							<MDBCardText className="text-muted">{user.firstName+ ' ' +user.lastName}</MDBCardText>
						</MDBCol>
					</MDBRow>
				</MDBCardBody>
			</MDBCard>
		</>
	)
}



