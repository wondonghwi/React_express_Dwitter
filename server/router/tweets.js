import express from 'express';
import 'express-async-errors';
import * as tweetRepository from '../data/tweet.js';

const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get('/', (req, res, next) => {
  const username = req.query.username;
  const data = username ? tweetRepository.getAllByUsername(username) : tweetRepository.getAll();
  res.status(200).json(data);
});
// GET /tweets/:id
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const tweetData = tweetRepository.getAllById(id);
  if (tweetData) {
    res.status(200).json(tweetData);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});
// POST /tweets
router.post('/', (req, res, next) => {
  const { text, name, username } = req.body;
  res.status(201).json(tweetRepository.create(text, name, username));
});
// PUT /tweets/:id
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const { text } = req.body;
  const tweet = tweetRepository.update(id, text);
  if (tweet) {
    res.status(200).json(text);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});
// DELETE /tweets/:id
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  tweetRepository.remove(id);
  res.sendStatus(204);
});

export default router;
