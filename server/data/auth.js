import { useVirtualId } from '../db/database.js';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  url: { type: String },
});

useVirtualId(userSchema);

const User = mongoose.model('User', userSchema);

export const findByUsername = async username => {
  return User.findOne({ username });
};

export const findById = async id => {
  return User.findById(id);
};

export const createUser = async user => {
  return new User(user).save().then(data => data.id);
};
