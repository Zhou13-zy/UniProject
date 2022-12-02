import React from 'react';
import Typography from '@mui/material/Typography';
import AvatarProfile from './AvatarProfile';
import { Button, Card, CardActions, CardContent } from '@mui/material';
import { apiCall } from '../utils/ApiCalls';
import EditTaskCommentPopup from './EditTaskCommentPopup';

export function TaskCommentCard ({comment, getComments, assignee}) {
	const [commentUsername, setCommentUsername] = React.useState('');
	const [firstname, setFirstname] = React.useState('');
	const [lastname, setLastname] = React.useState('');
	const [isAssignee, setIsAssignee] = React.useState(false);
	const [isPoster, setIsPoster] = React.useState(false);
	const userId = parseInt(localStorage.getItem('userId'), 10);

	const headers = {
		'Accept': 'application/json',
	}

	const getUserName = async () => {
		const data = await apiCall('GET', headers, {}, `user?userId=${comment.commentBy}`);
		setCommentUsername(data.firstName + ' ' + data.lastName);
		setFirstname(data.firstName);
		setLastname(data.lastName);
	}

	const delComment = async () => {
		await apiCall('DELETE', headers, {}, `taskcomment?taskId=${comment.taskId}&commentId=${comment.commentId}`);
		getComments(comment.taskId);
	}

	const checkIsPoster = () => {
		(userId === comment.commentBy) && setIsPoster(true);
	}

	const checkIsAssignee = () => {
		(userId === assignee) && setIsAssignee(true);
	}

	React.useEffect(() => {
		getUserName();
		checkIsAssignee();
		checkIsPoster();
		getComments(comment.taskId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
  return (
		<>
			<Card className='bg-info bg-gradient bg-opacity-25 mb-2'>
				<CardContent className="d-flex flex-column">
					<div className="d-flex flex-row justify-content-start align-items-center mb-3">
						<AvatarProfile firstname={firstname} lastname={lastname}/>
						<Typography variant="body2" className='mx-3'>
							<strong>{commentUsername}</strong>
						</Typography>
					</div>
					<div className='mx-2'>
						<Typography variant="body2" gutterBottom>
							{comment.commentText}
						</Typography>
					</div>
				</CardContent>
				<CardActions className='bg-light bg-gradient bg-opacity-50 justify-content-around'>
					{
						(isPoster || isAssignee)
						&&
						<Button color="error" onClick={delComment} className="bg-danger text-white">
							Delete
						</Button>
					}
					{
						isPoster
						&&
						<EditTaskCommentPopup comment={comment} getComments={getComments}/>
					}
				</CardActions>
			</Card>
		</>
	)
}