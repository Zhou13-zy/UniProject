import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

export default function AvatarProfile({firstname, lastname}) {
  const firstInitial = firstname.charAt(0).toUpperCase();
  const lastInitial = lastname.charAt(0).toUpperCase();
  return (
      <Avatar sx={{ bgcolor: deepOrange[500] }}>{firstInitial+lastInitial}</Avatar>
  );
}
