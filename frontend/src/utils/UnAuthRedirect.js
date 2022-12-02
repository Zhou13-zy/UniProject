import React from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from './ApiCalls';


export function UnAuthRedirect () {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
	const headers = {
		'Accept': 'application/json',
	}
  const logoutUser = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

	const validateToken = async () => {
		const data = await apiCall('PUT', headers, {}, `user/validate_token?token=${token}`);
		data.api_response.code !== 201 && logoutUser();
	}
  React.useEffect(() => {
    token ? validateToken() : logoutUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}