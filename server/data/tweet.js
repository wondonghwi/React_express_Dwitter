export let tweets = [
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
    name: 'won',
    username: 'donghwi',
  },
];

export const getAll = async () => {
  return tweets;
};

export const getAllByUsername = async username => {
  return tweets.filter(tweet => tweet.username === username);
};

export const getAllById = async id => {
  return tweets.find(tweet => tweet.id === id);
};

export const create = async (text, name, username) => {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];
  return tweet;
};

export const update = async (id, text) => {
  const tweet = tweets.find(tweet => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return tweet;
};

export const remove = async id => {
  tweets = tweets.filter(tweet => tweet.id !== id);
};
