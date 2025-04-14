import { data, redirect } from 'react-router-dom';

import AuthForm from './AuthForm';

export default function Login() {
	return <AuthForm />;
}


export async function action({ request }) {
	const searchParams = new URL(request.url).searchParams;
	const mode = searchParams.get('mode') || 'signup';
  
	if (mode !== 'login' && mode !== 'signup') {
	  throw data({ message: 'Unsupported mode.' }, { status: 422 });
	}
  
	const data1 = await request.formData();
	const authData = {
	  email: data1.get('email'),
	  password: data1.get('password'),
	};
  
	const response = await fetch('http://localhost:8080/' + mode, {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(authData),
	});
  
	if (response.status === 422 || response.status === 401) {
	  return response;
	}
  
	if (!response.ok) {
	  throw data({ message: 'Could not authenticate user.' }, { status: 500 });
	}
  
	const resData = await response.json();
	const token = resData.token;
  
	localStorage.setItem('token', token);
	const expiration = new Date();

	expiration.setHours(expiration.getHours() + 1);
	localStorage.setItem('expiration', expiration.toISOString());
  
	return redirect('/');
  }