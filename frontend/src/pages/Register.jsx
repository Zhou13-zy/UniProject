import React from 'react';
import RegisterForm from '../components/RegisterForm';
import styles from '../App.module.css';
import { useNavigate } from 'react-router-dom';
import appLogo from "../assets/Peera2.png";
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { apiCall } from '../utils/ApiCalls';
import { AuthRedirect } from '../utils/AuthRedirect';

function Register () {
	AuthRedirect();
  const navigate = useNavigate();
	const headers = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Origin': 'http://localhost:3000',
	}
	return (
		<div className={styles.home}>
			<Grid container spacing={3} alignItems="center" justifyContent="center">
				<div className={styles.authForm}>
					<Grid item sx={{ mb: 3 }}>
						<Link to="/" className={styles.navItem}><img className={styles.icon} src={appLogo} alt='task management logo'/></Link>
					</Grid>
					<Typography
							color='#38a22a'
							gutterBottom
							variant='h4'
					>
							Sign up
					</Typography>
					<Grid item xs={12}>
						<RegisterForm
							submit={async (userId, email, password, firstName, lastName) => {
								await apiCall(
									'POST',
									headers,
									{userId, email, password, firstName, lastName},
									'user/register'
								);
								navigate('/login');
							}}
						/>
					</Grid>
				</div>
			</Grid>
		</div>
		)
}

export default Register;