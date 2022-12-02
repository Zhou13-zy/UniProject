import React from 'react'
import { Grid } from '@mui/material';
import styles from '../App.module.css';
import ItemNoEdit from './ItemNoEdit';

function ColumnNoEdit({ itemList, colTitle, color, getTasks }) {

	return (
		<Grid
			container
			spacing={5}
			direction="column"
			alignItems="center"
			justifyContent="flex-start"
			style={{ minHeight: '50vh' }}
		>
			<Grid item xs={3}>
				<header className={styles.columnHeading}> 
					<h3>
						{colTitle}
					</h3>
				</header>
			</Grid>
			<Grid item xs={3}>
				{
					itemList
					&&
					itemList
						.filter((task) => task.dueDate !== null)
						.sort((task1, task2) => task1.dueDate.localeCompare(task2.dueDate))
						.map((i, index) => (
						<ItemNoEdit
							key={index}
							idx={index}
							task={i} 
							color={color}
							getTasks={getTasks}
						/>
					))
				}
				{
					itemList
					&&
					itemList
						.filter((task) => !task.dueDate)
						.map((i, index) => (
						<ItemNoEdit
							key={index}
							idx={index}
							task={i} 
							color={color}
							getTasks={getTasks}
						/>
					))
				}
			</Grid>
		</Grid>
	)
}

export default ColumnNoEdit;
