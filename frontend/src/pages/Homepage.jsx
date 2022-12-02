import React from 'react';
import { Link } from 'react-router-dom';
import appLogo from "../assets/Peera2.png";
import styles from '../App.module.css';

function Homepage () {
	return (
		<div className={styles.home}>
			<div>
				<img src={appLogo} alt="task management logo" />
			</div>
			<span className={styles.homepageSpan}>
				<Link to="/login" className={styles.navItem}>Login</Link>
				<Link to="/register" className={styles.navItem}>Register</Link>
			</span>
		</div>
	)
}

export default Homepage;