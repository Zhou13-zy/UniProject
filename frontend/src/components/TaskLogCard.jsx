import React from 'react';
import {
  MDBCard,
  MDBCardBody,
} from 'mdb-react-ui-kit';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { apiCall } from '../utils/ApiCalls';

export function TaskLogCard ({history}) {
	const [assigneeName, setAssigneeName] = React.useState('');

	const headers = {
		'Accept': 'application/json',
	}

	const getAssigneeName = async () => {
		const data = await apiCall('GET', headers, {}, `user?userId=${history.assignedTo}`);
		setAssigneeName(data.firstName + ' ' + data.lastName);
	}

	React.useEffect(() => {
		getAssigneeName();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
  return (
		<>
			<MDBCard className='mb-2 bg-info bg-gradient bg-opacity-50'>
				<MDBCardBody>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<Typography variant="subtitle2" gutterBottom>
								Task Title:
							</Typography>
						</Grid>
						<Grid item xs={8}>
							<Typography variant="body2" gutterBottom>
								{history.title}
							</Typography>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<Typography variant="subtitle2" gutterBottom>
								Description:
							</Typography>
						</Grid>
						<Grid item xs={8}>
							<Typography variant="body2" gutterBottom>
								{history.summary}
							</Typography>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<Typography variant="subtitle2" gutterBottom>
								Status:
							</Typography>
						</Grid>
						<Grid item xs={8}>
							<Typography variant="body2" gutterBottom>
								{history.status}
							</Typography>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<Typography variant="subtitle2" gutterBottom>
								Due Date:
							</Typography>
						</Grid>
						<Grid item xs={8}>
							<Typography variant="body2" gutterBottom>
								{history.dueDate}
							</Typography>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<Typography variant="subtitle2" gutterBottom>
								Assignee:
							</Typography>
						</Grid>
						<Grid item xs={8}>
							<Typography variant="body2" gutterBottom>
								{assigneeName}
							</Typography>
						</Grid>
					</Grid>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<Typography variant="subtitle2" gutterBottom>
								Effort:
							</Typography>
						</Grid>
						<Grid item xs={8}>
							<Typography variant="body2" gutterBottom>
								{history.effort} hr(s)
							</Typography>
						</Grid>
					</Grid>
				</MDBCardBody>
			</MDBCard>
		</>
	)
}