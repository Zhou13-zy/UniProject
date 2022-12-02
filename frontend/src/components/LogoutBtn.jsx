import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/ApiCalls';

function LogoutBtn () {
  const navigate = useNavigate();
  const headers = {
		'Accept': 'application/json',
	}
  const logout = async () => {
    await apiCall('DELETE', headers, {}, `user/logout?token=${localStorage.getItem('token')}`);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    navigate('/login');
  }
  return (
    <Button
      onClick={ logout }
      color='inherit'
      size='large'
    >
      Logout
    </Button>);
}

export default LogoutBtn;