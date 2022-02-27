import * as tweetRepository from '../data/tweet.js';

export const getTweets = async (req, res) => {
  const username = req.query.username;
  const data = await (username ? tweetRepository.getAllByUsername(username) : tweetRepository.getAll());
  res.status(200).json(data);
};

export const getTweet = async (req, res) => {
  const id = req.params.id;
  const tweetData = await tweetRepository.getById(id);
  if (tweetData) {
    res.status(200).json(tweetData);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
};

export const createTweet = async (req, res) => {
  const { text } = req.body;
  const tweet = await tweetRepository.create(text, req.userId);
  res.status(201).json(tweet);
};

export const updateTweet = async (req, res) => {
  const id = req.params.id;
  const { text } = req.body;
  const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    return res.status(404).json({ message: `Tweet not found: ${id}` });
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const updated = await tweetRepository.update(id, text);
  res.status(200).json(updated);
};

export const deleteTweet = async (req, res) => {
  const id = req.params.id;
  const tweet = await tweetRepository.getById(id);
  if (!tweet) {
    return res.status(404).json({ message: `Tweet not found: ${id}` });
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await tweetRepository.remove(id);
  res.sendStatus(204);
};
