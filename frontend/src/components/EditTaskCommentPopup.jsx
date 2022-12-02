import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import styles from '../App.module.css';
import { apiCall } from '../utils/ApiCalls';
import AuthTextInput from './styled/AuthTextInput';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10%',
  boxShadow: 24,
  p: 4,
};

export default function EditTaskCommentPopup({comment, getComments}) {
	const [commentText, setCommentText] = React.useState(comment.commentText);
	const commentBy = comment.commentBy.toString();
	const commentId = comment.commentId;
	const taskId = comment.taskId;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
	
	const headers = {
    'Content-Type': 'application/json',
		'Accept': 'application/json',
	}

  const updateComment = async () => {
    await apiCall('PUT', headers, {commentId, taskId, commentText, commentBy}, 'taskcomment');
    getComments(taskId);
  }

	const onclick = () => {
		updateComment();
		handleClose();
	}

	React.useEffect(() => {
    getComments(taskId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

  return (
    <div>
      <Button onClick={handleOpen} className="bg-info bg-gradient bg-opacity-50 text-white mb-2">Edit</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
						<AuthTextInput type='text' label='comment' size='small' fullWidth required
							value={commentText}
							onChange={(e) => setCommentText(e.target.value)}
						/>
            <div className={styles.rightButton}>
              <Button 
                variant="outlined" 
                color="primary"
                onClick={onclick}
              >
                update
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
