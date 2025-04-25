const express = require('express');
const bodyParser = require('body-parser');

const { getStoredPosts, storePosts } = require('./data/posts');

const app = express();

app.use(bodyParser.json());

const cors = require('cors');
app.use(cors()); 

// Connect to MongoDB
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://holysong87:55555@cluster0.fxtdw.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Meetup model
const Meetup = require('./models/Meetup');

// way
app.get('/meetups', async (req, res) => {
  try {
    const meetups = await Meetup.find();
    res.json(meetups);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении митапов' });
  }
});

// MongoDB

const authRoutes = require('./routes/auth');

  app.use(authRoutes);

  app.use((error, req, res, next) => {
	const status = error.status || 500;
	const message = error.message || 'Something went wrong.';
	res.status(status).json({ message: message });
  });


app.get('/posts', async (req, res) => {
  const storedPosts = await getStoredPosts();

  // Задержка сервера
	await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
	
  res.json({ posts: storedPosts });
});

app.get('/posts/:id', async (req, res) => {
  const storedPosts = await getStoredPosts();
  const post = storedPosts.find((post) => post.id === req.params.id);
  res.json({ post });
});

app.post('/posts', async (req, res) => {
  const existingPosts = await getStoredPosts();
  const postData = req.body;
  const newPost = {
    ...postData,
    id: Math.random().toString(),
  };
  const updatedPosts = [newPost, ...existingPosts];
  await storePosts(updatedPosts);
  res.status(201).json({ message: 'Stored new post.', post: newPost });
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

