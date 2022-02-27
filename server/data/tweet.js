import * as userRepository from './auth.js';

export let tweets = [
  {
    id: '1',
    text: '첫번째 작업',
    createdAt: Date.now().toString(),
    userId: '1',
  },
  {
    id: '2',
    text: '두번째 작업',
    createdAt: Date.now().toString(),
    userId: '1',
  },
];

export const getAll = async () => {
  return Promise.all(
    tweets.map(async tweet => {
      const { username, name, url } = await userRepository.findById(tweet.userId);
      return { ...tweet, username, name, url };
    })
  );
};

export const getAllByUsername = async username => {
  return getAll().then(tweets => tweets.filter(tweet => tweet.username === username));
};

export const getById = async id => {
  const found = tweets.find(tweet => tweet.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
};

export const create = async (text, userId) => {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return getById(tweet.id);
};

export const update = async (id, text) => {
  const tweet = tweets.find(tweet => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return getById(tweet.id);
};

export const remove = async id => {
  tweets = tweets.filter(tweet => tweet.id !== id);
};
