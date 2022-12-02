import React from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import appLogo from "../assets/Peera2.png";
import { Link } from 'react-router-dom';
import styles from '../App.module.css';
import { Grid, Typography } from '@mui/material';
import { apiCall } from '../utils/ApiCalls';
import { AuthRedirect } from '../utils/AuthRedirect';

function Login () {
	AuthRedirect();
  const navigate = useNavigate();
	const headers = {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Origin': 'http://localhost:3000',
	}
	return (
		<div className={styles.home}>
			<Grid container spacing={2} alignItems="center" justifyContent="center">
				<div className={styles.authForm}>
					<Grid item sx={{ mb: 3 }}>
							<Link to="/" className={styles.navItem}><img className={styles.icon} src={appLogo} alt='task management logo'/></Link>
					</Grid>
					<Typography
							color='#38a22a'
							gutterBottom
							variant='h4'
					>
							Sign in
					</Typography>
					<div>
						<LoginForm
							submit={async (email, password) => {
								const data = await apiCall(
									'POST',
									headers,
									{},
									`user/login?username=${email}&password=${password}`
									)
								console.log(data.userId);
								if (data.userId) {
									localStorage.setItem('token', data.token);
									localStorage.setItem('email', data.email);
									localStorage.setItem('userId', data.userId);
									localStorage.setItem('firstName', data.firstName);
									localStorage.setItem('lastName', data.lastName);
									navigate('/profile');
								} else {
									alert('incorrect email or password, please try again');
									navigate('/login');
								}
							}}
						/>
					</div>
				</div>
			</Grid>
		</div>
	)
}

export default Login;