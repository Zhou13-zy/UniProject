import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialogDisconnect({cancelConnection, userDetail}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const clickDisconnectBtn = () => {
		cancelConnection();
		handleClose();	
	}

  return (
    <div>
      <Button onClick={handleClickOpen} className="bg-danger text-white">
        Disconnenct
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="p-3">
          <DialogTitle id="alert-dialog-title">
            {`Disconnect with user: ${userDetail.firstName + ' ' + userDetail.lastName}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You will not see this page once disconnencted
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>Cancel</Button>
            <Button onClick={clickDisconnectBtn}>
              Disconnect
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
