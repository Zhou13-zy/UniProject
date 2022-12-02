import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import styles from '../App.module.css';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AvatarProfile from './AvatarProfile';
import LogoutBtn from './LogoutBtn';
import { apiCall } from '../utils/ApiCalls';
import SearchResultPopover from './SearchResultPopover';
import NotificationPopup from './NotificationPopup';
import NewConnectionInvitation from './NewConnectionInvitation';

export default function ProfileHeader({firstname, lastname}) {
  const userId = localStorage.getItem('userId');
  const [connectedUserIds, setConnectedUserIds] = React.useState([parseInt(userId, 10)]);
  const headers = {
		'Accept': 'application/json',
	}
  const getAllConnectedUsers = async () => {
    const data = await apiCall('GET', headers, {}, `connection?userId=${userId}`);
    data.map((user) => (
      !connectedUserIds.includes(user.connectedUserId)
      &&
      connectedUserIds.push(user.connectedUserId)
    ))
    setConnectedUserIds(connectedUserIds);
  }
  React.useEffect(() => {
    getAllConnectedUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className='justify-content-between'>
          <div className='d-flex flex-row justify-content-between align-items-center'>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Link to='/profile' className={styles.navbarAvatar}><AvatarProfile firstname={firstname} lastname={lastname}/></Link>
            </IconButton>
            <NotificationPopup />
            <NewConnectionInvitation />
          </div>
          <SearchResultPopover connectedUserIds={connectedUserIds}/>
          <LogoutBtn/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
