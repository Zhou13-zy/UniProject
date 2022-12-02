import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialogDelTask({deleteTask, taskId}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const clickDeleteBtn = () => {
		deleteTask(taskId);
    handleClose();	
    setTimeout(() => {
      alert('task deleted!');
    }, 1000);
	}

  return (
    <div>
      <Button color="error" onClick={handleClickOpen} className="bg-danger text-white">
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className='p-3'>
          <DialogTitle id="alert-dialog-title">
            {`Delete Task ${taskId}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You will delete this task permanently
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>Cancel</Button>
            <Button onClick={clickDeleteBtn}>
              Delete
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
