import express from 'express';
import 'express-async-errors';

let tweets = [
  {
    id: '1',
    text: '첫번째 작업',
    createdAt: Date.now().toString(),
    name: 'Bob',
    username: 'bob',
    url: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg',
  },
  {
    id: '2',
    text: '두번째 작업',
    createdAt: Date.now().toString(),
    name: 'donghwi',
    username: 'won',
  },
];

const router = express.Router();
// app.get('/', (req, res, next) => {});

// GET /tweets
// GET /tweets?username=:username
router.get('/', (req, res, next) => {
  const username = req.query.username;
  const data = username ? tweets.filter(tweet => tweet.username === req.query.username) : tweets;
  res.status(200).json(data);
});
// GET /tweets/:id
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const tweetData = tweets.find(tweet => tweet.id === id);
  if (tweetData) {
    res.status(200).json(tweetData);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});
// POST /tweets
router.post('/', (req, res, next) => {
  const { text, name, username } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});
// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweets.find(tweet => tweet.id === id);
  if (tweet) {
    tweet.text = text;
    res.status(200).json(text);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});
// DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  tweets = tweets.filter(tweet => tweet.id !== id);
  res.sendStatus(204);
});

export default router;
