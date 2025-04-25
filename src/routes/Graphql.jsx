import { useQuery, useMutation, gql } from '@apollo/client';
import classes from './Graphql.module.css';
import { useState } from 'react';

const GET_POSTS = gql`
	query {
		allPosts {
			id
			title
			body
		}
	}
`;

// Мутация: добавление поста
const ADD_POST = gql`
	mutation CreatePost($title: String!, $body: String!) {
		createPost(title: $title, body: $body) {
			id
			title
			body
		}
	}
`;

const DELETE_POST = gql`
	mutation RemovePost($id: ID!) {
		removePost(id: $id) {
			id
		}
	}
`;

const UPDATE_POST = gql`
	mutation UpdatePost($id: ID!, $title: String!, $body: String!) {
		updatePost(id: $id, title: $title, body: $body) {
			id
			title
			body
		}
	}
`;

export default function Graphql() {
	const { loading, error, data, refetch } = useQuery(GET_POSTS);

	// open / close form
	const [form, setForm] = useState(false);
	//

	// for edit posts
	const [editingPostId, setEditingPostId] = useState(null);
	const [editTitle, setEditTitle] = useState('');
	const [editBody, setEditBody] = useState('');
	const [updatePost] = useMutation(UPDATE_POST);
	//

	// for posting
	const [createPost] = useMutation(ADD_POST);
	const [deletePost] = useMutation(DELETE_POST);

	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title || !body) return;

		await createPost({ variables: { title, body } });
		await refetch(); // Обновляем список постов
		setTitle('');
		setBody('');
	};
	// for posting

	// for update
	const handleEdit = (post) => {
		setEditingPostId(post.id);
		setEditTitle(post.title);
		setEditBody(post.body);
	};

	const handleUpdate = async () => {
		await updatePost({
			variables: {
				id: editingPostId,
				title: editTitle,
				body: editBody,
			},
		});
		setEditingPostId(null);
		await refetch();
	};
	// for update

	// for remove post
	const handleDelete = async (id) => {
		await deletePost({ variables: { id } });
		await refetch();
	};
	// for remove post

	if (loading) return <p>loading data...</p>;
	if (error) return <p>Error: {error.message}. Please start the graphQL server</p>;

	let contentForm = 'The form is disabled now';

	if (form) {
		contentForm = (
			<form onSubmit={handleSubmit}>
				<input
					placeholder="Your title please"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<br />
				<textarea
					placeholder="Text description"
					value={body}
					onChange={(e) => setBody(e.target.value)}
				/>
				<br />
				<button type="submit">Add new post</button>
			</form>
		);
	}

	return (
		<div className={classes.container}>
			<p>Add posts to graphQL BD</p>
			<button onClick={() => setForm(form ? false : true)}>
				{form ? ' Close form' : 'Open form for adding new post'}
			</button>

			{form && contentForm}

			<p>Appolo graphql posts</p>
			<ul className={classes.list}>
				{data.allPosts.map((post) => (
					<li key={post.id}>
						{editingPostId === post.id ? (
							<div>
								<input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
								<br />
								<textarea value={editBody} onChange={(e) => setEditBody(e.target.value)} />
								<br />
								<button onClick={handleUpdate}>💾</button>
								<button onClick={() => setEditingPostId(null)}>X</button>
							</div>
						) : (
							<div>
								<strong>{post.title}</strong>: {post.body}
								<button className={classes.delete} onClick={() => handleEdit(post)}>
									✏️
								</button>
								<button className={classes.delete} onClick={() => handleDelete(post.id)}>
									X
								</button>
							</div>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
