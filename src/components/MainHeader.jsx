import { Link, Form, useRouteLoaderData } from 'react-router-dom';
import { MdPostAdd, MdMessage } from 'react-icons/md';

import { checkAuthLoader, tokenLoader } from '../util/auth';

import classes from './MainHeader.module.css';

function MainHeader() {
	const token = tokenLoader();

	return (
		<header className={classes.header}>
			<Link to="/">
				<h1 className={classes.logo}>
					<MdMessage />
					Best news
				</h1>
			</Link>

			{!token && (
				<p>
					<Link to="/signup" className={classes.login}>
						Create new user / Login
					</Link>
				</p>
			)}

			{token && (
				<Form action="/logout" method="post" className={classes.login}>
					<button>Logout</button>
				</Form>
			)}

			{token && (
				<p>
					<Link to="/create-post" className={classes.button}>
						<MdPostAdd size={18} />
						New Post
					</Link>
				</p>
			)}
		</header>
	);
}

export default MainHeader;
