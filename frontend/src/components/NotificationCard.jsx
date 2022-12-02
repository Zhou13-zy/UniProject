import React from 'react';
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { Button } from '@mui/material';

export function NotificationCard ({request, acceptRequest, ignoreRequest}) {
  return (
		<>
			<MDBCard className="mb-3 bg-info bg-gradient bg-opacity-25">
				<MDBCardBody>
					<MDBRow>
						<MDBCol sm="1">
							<MDBIcon fas icon="user-tie" />
						</MDBCol>
						<MDBCol sm="5">
							<MDBCardText className="text-muted">{request.firstName+ ' ' +request.lastName}</MDBCardText>
						</MDBCol>
						<MDBCol sm="3">
							<Button className="bg-success bg-gradient text-white px-3"
								onClick={() => acceptRequest(request)}
							>
								Accept
							</Button>
						</MDBCol>
						<MDBCol sm="3">
							<Button className="bg-danger bg-gradient text-white px-3"
								onClick={() => ignoreRequest(request)}
							>
								ignore
							</Button>
						</MDBCol>
					</MDBRow>
				</MDBCardBody>
			</MDBCard>
		</>
	)
}



