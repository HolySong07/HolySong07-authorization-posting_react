import { Link, Form, redirect } from 'react-router-dom';
import { queryClient } from '../main.jsx';

import classes from './NewPost.module.css';
import Modal from '../components/Modal';

function NewPost() {
  return (
    <Modal>
      <Form method='post' className={classes.form}>
	  	<p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="author" required />
        </p>
        <p>
          <label htmlFor="Title">Text</label>
          <input id="body" name="body" required  />
        </p>
		<p>
          <label htmlFor="fullText">Your Full text</label>
          <textarea type="text" id="fullText" rows={3} name="fullText" required />
        </p>
        
        <p className={classes.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button>Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPost;

export async function action({request}) {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData); 
  await fetch('http://localhost:8080/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  queryClient.invalidateQueries({ queryKey: ['repoData'] });

  return redirect('/');
}