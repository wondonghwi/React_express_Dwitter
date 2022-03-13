import mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';
import * as userRepository from './auth.js';

// NOSQL (정보의 중복 > 관계)

const tweetSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    url: { type: String },
  },
  { timestamps: true }
);

useVirtualId(tweetSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

export const getAll = async () => {
  return Tweet.find().sort({ createdAt: -1 });
};

export const getAllByUsername = async username => {
  return Tweet.find({ username });
};

export const getById = async id => {
  return Tweet.findById(id);
};

export const create = async (text, userId) => {
  return userRepository.findById(userId).then(user =>
    new Tweet({
      text,
      userId,
      name: user.name,
      username: user.username,
    }).save()
  );
};

export const update = async (id, text) => {
  return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false });
};

export const remove = async id => {
  return Tweet.findByIdAndDelete(id);
};
