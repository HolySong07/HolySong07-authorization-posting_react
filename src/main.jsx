import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { action as logoutAction } from './routes/Logout';

import Posts, { loader as postsLoader } from './routes/Posts';
import NewPost, { action as newPostAction } from './routes/NewPost';
import PostDetails, { loader as postDetailsLoader } from './routes/PostDetails';
import RootLayout from './routes/RootLayout';
import './index.css';
import { tokenLoader } from './util/auth';
import Mongodb from './routes/Mongodb.jsx';
import Graphql from './routes/Graphql.jsx';

// appolo + graphQL
import { ApolloProvider } from '@apollo/client';
import client from '../apolloClient.js';
// appolo + graphQL

import Login, { action as authAction } from './components/Login';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export const queryClient = new QueryClient();

import { Provider } from 'react-redux';
import store from './store/index.jsx';

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
				children: [
					{ path: '/create-post', element: <NewPost />, action: newPostAction },
					{ path: '/:postId', element: <PostDetails />, loader: postDetailsLoader },
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
			{
				path: '/graphql',
				element: <Graphql />,
			},
			{
				path: '/mongodb',
				element: <Mongodb />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<ApolloProvider client={client}>	
					<RouterProvider router={router} />
				</ApolloProvider>	
			</Provider>
		</QueryClientProvider>
	</React.StrictMode>
);
