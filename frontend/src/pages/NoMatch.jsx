import React from 'react';
import appLogo from "../assets/Peera2.png";
import { Link } from 'react-router-dom';
import styles from '../App.module.css';

function NoMatch () {
	return (
		<div className={styles.home}>
			<Link to="/">
				<img src={appLogo} alt="task management logo" />
			</Link>
			<h1>Page Not Found!</h1>
		</div>
	)
}

export default NoMatch;