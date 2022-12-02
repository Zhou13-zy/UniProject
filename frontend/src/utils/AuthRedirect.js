
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from './ApiCalls';

export function AuthRedirect () {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');
	const headers = {
		'Accept': 'application/json',
	}
	const validateToken = async () => {
		const data = await apiCall('PUT', headers, {}, `user/validate_token?token=${token}`);
		data.api_response.code === 201 ? navigate('/profile') : localStorage.removeItem('token');
	}

	React.useEffect(() => {
		token && validateToken();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
  }