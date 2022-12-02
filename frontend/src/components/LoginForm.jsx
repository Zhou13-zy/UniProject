import React from 'react';
import Button from '@mui/material/Button';
import AuthTextInput from './styled/AuthTextInput';
import { Box, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from '../App.module.css';

function LoginForm ({submit}) {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const onSubmit = (e) => {
		e.preventDefault();
		submit(email, password);
	}
	return (
		<form onSubmit={onSubmit}>
			<AuthTextInput type='email' label='Email' size='small' fullWidth margin="normal" required value={email} onChange={e => setEmail(e.target.value)} /><br />
			<AuthTextInput type='password' label='Password' size='small' fullWidth margin="normal" required value={password} onChange={e => setPassword(e.target.value)} /><br />
			<Box sx={{ mt: 5 }}>
				<Button
					type='submit'
					variant='outlined'
					fullWidth
					size="large"
					color="primary"
					className='mb-5'
				>
					Login
				</Button>
			</Box>
			<Grid item xs={12}>
				<Grid item container direction="column" alignItems="center" xs={12}>
					<Typography
							variant="subtitle1"
							sx={{ textDecoration: 'none' }}
					>
						<span>Don't have an account yet? <Link to="/register" className={styles.regoRedirectLink}>Register Now</Link></span>
					</Typography>
				</Grid>
			</Grid>
		</form>
	)
}

export default LoginForm;