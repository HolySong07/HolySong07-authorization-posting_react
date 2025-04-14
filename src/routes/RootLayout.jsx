import { Outlet, useLoaderData, useSubmit  } from 'react-router-dom';
import { useEffect } from 'react';


import MainHeader from '../components/MainHeader';
import { getTokenDuration } from '../util/auth';


function RootLayout() {
	const token = useLoaderData();
	const submit = useSubmit();

	useEffect(() => {
		if (!token) {
		  return;
		}
	
		if (token === 'EXPIRED') {
		  submit(null, { action: '/logout', method: 'post' });
		  return;
		}
	
		const tokenDuration = getTokenDuration();
		console.log(tokenDuration);
	
		setTimeout(() => {
		  submit(null, { action: '/logout', method: 'post' });
		}, tokenDuration);
	  }, [token, submit]);


  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export default RootLayout;