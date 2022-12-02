import React from 'react';
import { apiCall } from '../utils/ApiCalls.jsx';
import styles from '../App.module.css';
import { Grid } from '@mui/material';
import { UnAuthRedirect } from '../utils/UnAuthRedirect';
import ProfileHeader from '../components/ProfileHeader';
import ColumnNoEdit from '../components/ColumnNoEdit.jsx';

export function DashboardUser () {
	UnAuthRedirect();
	const [taskData, setTaskData] = React.useState([]);
	const headers = {
		'Accept': 'application/json',
	}

	const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : 0;
  const firstName = localStorage.getItem('firstName') ? localStorage.getItem('firstName') : '';
  const lastName = localStorage.getItem('lastName') ? localStorage.getItem('lastName') : '';


	const getTasks = async () => {
		const data = await apiCall('GET', headers, {}, `task/getall?userId=${userId}`);
		setTaskData(data);
	}

	React.useEffect(() => {
		getTasks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return(
		<div className={styles.dashboard}>
			<ProfileHeader firstname={firstName} lastname={lastName}/>
			<div className='mt-5'>
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
							<ColumnNoEdit
								itemList={
									!taskData.api_response
									&&
									taskData.filter(task => task.status === 'Not Started')
								}
								colTitle='Not Started'
								color='orange'
								getTasks={getTasks}
							/>
						</Grid>
						<Grid item columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
							<ColumnNoEdit
								itemList={
									!taskData.api_response
									&&
									taskData.filter(task => task.status === 'In Progress')
								}
								colTitle='In Progress'
								color='purple'
								getTasks={getTasks}
							/>
						</Grid>
						<Grid item columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
							<ColumnNoEdit
								itemList={
									!taskData.api_response
									&&
									taskData.filter(task => task.status === 'Blocked')
								}
								colTitle='Blocked'
								color='red'
								getTasks={getTasks}
							/>
						</Grid>
						<Grid item columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
							<ColumnNoEdit
								itemList={
									!taskData.api_response
									&&
									taskData.filter(task => task.status === 'Completed')
								}
								colTitle='Completed'
								color='green'
								getTasks={getTasks}
							/>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}