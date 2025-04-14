import { Outlet } from 'react-router-dom';
import classes from '../components/PostsList.module.css';
import {useQuery} from '@tanstack/react-query'

import Post from '../components/Post';

function Posts() {
	const { isPending, error, data, isFetching } = useQuery({
		queryKey: ['repoData'],
		queryFn: loader,
	  });

	  if (isPending) return 'Loading data from server (1.5sec)...'

  return (
    <>
      <Outlet />
      <main>
		<ul className={classes.posts}>
	  		{data.map((post) => (
            	<Post key={post.id} id={post.id} author={post.author} body={post.body} />
        	))}
		</ul>
        
      </main>
    </>
  );
}

export default Posts;

/* export async function loader() {
  const response = await fetch('http://localhost:8080/posts');
  const resData = await response.json();
  return resData.posts;
} */

export async function loader() {
	const response = await fetch('http://localhost:8080/posts');
	const resData = await response.json();
	return resData.posts;
  }