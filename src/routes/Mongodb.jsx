import { useState, useEffect } from 'react';
import classes from './mongodb.module.css';

export default function Mongodb() {
	const [db, setDB] = useState(undefined);

	useEffect(() => {
		fetch('http://localhost:8080/meetups')
			.then((res) => res.json())
			.then((data) => setDB(data));
	}, []);

	//console.log(db);

	return (
		<>
			<p>MongoВИ is connected via express js</p>
			<ul className={classes.list}>
				{db &&
					db.map((post) => (
						<li key={post._id}>
							<p>{post.title}</p>
							<img src={post.image} alt={post.title} />
							<p>{post.description}</p>
						</li>
					))}
			</ul>
		</>
	);
}
