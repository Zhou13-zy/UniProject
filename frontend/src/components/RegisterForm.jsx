import React from 'react';
import Button from '@mui/material/Button';
import AuthTextInput from './styled/AuthTextInput';
import { Link } from 'react-router-dom';
import styles from '../App.module.css';
import { Box, Grid, Typography } from '@mui/material';

function RegisterForm ({submit}) {
	const userId = 'userId';
	const [email, setEmail] = React.useState('');
	const [firstName, setFirstName] = React.useState('');
	const [lastName, setLastName] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');

	const onSubmit = (e) => {
    e.preventDefault();
    submit(userId, email, password, firstName, lastName);
  }

	const isValidEmail = (email) => {
		return /\S+@\S+\.\S+/.test(email) || email.length === 0;
	}

	const isValidName = (name) => {
		return name.length < 15 || name.length === 0
	}

	const isValidPassword = (password) => {
		const uppercaseRegExp   = /(?=.*?[A-Z])/;
    const lowercaseRegExp   = /(?=.*?[a-z])/;
    const digitsRegExp      = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp   = /.{10,}/;

		return (uppercaseRegExp.test(password) &&
			lowercaseRegExp.test(password) &&
			(digitsRegExp.test(password) || specialCharRegExp.test(password)) &&
			minLengthRegExp.test(password) ) || password.length === 0
	}
	return (
		<form onSubmit={onSubmit} style={{maxWidth: 400, overflow: 'auto'}}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<AuthTextInput type='firstname' label='FirstName' size='small' margin="normal" fullWidth required value={firstName}
						onChange={e => setFirstName(e.target.value)}
						error={!isValidName(firstName)}
						helperText={!isValidName(firstName) ? 'name must be less than 15 characters' : null}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<AuthTextInput type='lastname' label='LastName' size='small' margin="normal" fullWidth required value={lastName}
						onChange={e => setLastName(e.target.value)}
						error={!isValidName(lastName)}
						helperText={!isValidName(lastName) ? 'name must be less than 15 characters' : null}
					/>
				</Grid>
			</Grid>
			<AuthTextInput type='email' label='Email' size='small' margin="normal" required value={email}
				fullWidth
				onChange={e => setEmail(e.target.value)}
				error={!isValidEmail(email)}
				helperText={!isValidEmail(email) ? 'email must in correct format' : null}
			/>
			<AuthTextInput type='password' label='Password' size='small' margin="normal" required value={password}
				fullWidth
				onChange={e => setPassword(e.target.value)}
				error={!isValidPassword(password)}
				helperText={!isValidPassword(password) ? 'password must be at least 10 characters, one uppercase, one lowercase, one digit or special character' : null}
				/><br />
			<AuthTextInput type='password' label='Confirm Password' size='small' margin="normal" required value={confirmPassword}
				fullWidth
				onChange={e => setConfirmPassword(e.target.value)}
				error={password !== confirmPassword}
				helperText={password !== confirmPassword ? 'Passwords must match' : null}
			/><br />
			<Box sx={{ mt: 5 }}>
				<Button
					type='submit'
					variant='outlined'
					fullWidth
					size="large"
					color="primary"
					className='mb-5'
				>
					Register
				</Button>
			</Box>
			<Grid item xs={12}>
				<Grid item container direction="column" alignItems="center" xs={12}>
					<Typography
							variant="subtitle1"
							sx={{ textDecoration: 'none' }}
					>
						<span>Already have login and password? <Link to="/login" className={styles.regoRedirectLink}>Login</Link></span>
					</Typography>
				</Grid>
			</Grid>
		</form>
	)
}

export default RegisterForm;