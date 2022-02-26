import * as tweetRepository from '../data/tweet.js';

export const getTweets = (req, res) => {
  const username = req.query.username;
  const data = username ? tweetRepository.getAllByUsername(username) : tweetRepository.getAll();
  res.status(200).json(data);
};

export const getTweet = (req, res) => {
  const id = req.params.id;
  const tweetData = tweetRepository.getAllById(id);
  if (tweetData) {
    res.status(200).json(tweetData);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
};

export const createTweet = (req, res) => {
  const { text, name, username } = req.body;
  res.status(201).json(tweetRepository.create(text, name, username));
};

export const updateTweet = (req, res) => {
  const id = req.params.id;
  const { text } = req.body;
  const tweet = tweetRepository.update(id, text);
  if (tweet) {
    res.status(200).json(text);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
};

export const deleteTweet = (req, res) => {
  const id = req.params.id;
  tweetRepository.remove(id);
  res.sendStatus(204);
};
