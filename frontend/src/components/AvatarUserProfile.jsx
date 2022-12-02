import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import { AvatarGroup } from '@mui/material';

export default function AvatarUserProfile({firstname, lastname}) {
  const firstInitial = firstname.charAt(0).toUpperCase();
  const lastInitial = lastname.charAt(0).toUpperCase();
	const avatarStyle = {
		bgcolor: deepOrange[500],
		fontSize: "5rem",
		"--Avatar-size": "100px"
	};
  return (
		<AvatarGroup sx={{ 
			justifyContent: 'center',
		 }}>
      <Avatar sx={avatarStyle} style={{ width: '160px', height:'160px' }}>
        {firstInitial+lastInitial}
    	</Avatar>
		</AvatarGroup>
  );
}
