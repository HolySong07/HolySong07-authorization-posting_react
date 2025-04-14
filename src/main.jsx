import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { action as logoutAction } from './routes/Logout';

import Posts, { loader as postsLoader } from './routes/Posts';
import NewPost, { action as newPostAction } from './routes/NewPost';
import PostDetails, { loader as postDetailsLoader } from './routes/PostDetails';
import RootLayout from './routes/RootLayout';
import './index.css';
import { checkAuthLoader, tokenLoader } from './util/auth';

import Login, {action as authAction} from './components/Login';


import {
	QueryClient,
	QueryClientProvider,
	useQuery,
  } from '@tanstack/react-query'

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
	id: 'root',
	loader: tokenLoader,
    children: [
      {
        path: '/',
        element: <Posts />,
       	//loader: postsLoader,
        children: [
          { path: '/create-post', 
			element: <NewPost />, 
			action: newPostAction 
			},
          { path: '/:postId', 
			element: <PostDetails />, 
			loader: postDetailsLoader 
		}
        ],
      },
	  {
        path: '/signup',
        element: <Login />,
		action: authAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
	  <QueryClientProvider client={queryClient}>

    	<RouterProvider router={router} />

	</QueryClientProvider>
  </React.StrictMode>
);