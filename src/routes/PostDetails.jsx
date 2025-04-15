import { useLoaderData, Link } from 'react-router-dom';

import Modal from '../components/Modal';
import classes from './PostDetails.module.css';

import fire from '../img/fire.jpg';
import bad from '../img/bad.jpg';
import good from '../img/good.jpg';



function PostDetails() {
	

	const post = useLoaderData();

	if (!post) {
		return (
			<Modal>
				<main className={classes.details}>
					<h1>Could not find post</h1>
					<p>Unfortunately, the requested post could not be found.</p>
					<p>
						<Link to=".." className={classes.btn}>
							Okay
						</Link>
					</p>
				</main>
			</Modal>
		);
	}
	return (
		<Modal>
			<main className={classes.details}>
				<p className={classes.vote}>
					<span>
						{post.fire}
						<img src={fire}></img>
					</span>
					<span>
						{post.bad}
						<img src={bad}></img>
					</span>
					<span>
						{post.fire}
						<img src={good}></img>
					</span>
				</p>
				<p className={classes.author}>{post.author}</p>
				<p className={classes.text}>{post.body}</p>
				<p className={classes.fullText}>{post.fullText}</p>
			</main>
		</Modal>
	);
}

export default PostDetails;

export async function loader({ params }) {
	const response = await fetch('http://localhost:8080/posts/' + params.postId);
	const resData = await response.json();
	return resData.post;
}
