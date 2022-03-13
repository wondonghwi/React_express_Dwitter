import mongoose from 'mongoose';
import { config } from '../config.js';

let db;
export const connectDB = async () => {
  return mongoose.connect(config.db.host);
};

//DB = _id -> 읽어올때 = id
export const useVirtualId = schema => {
  schema.virtual('id').get(function () {
    return this._id.toString();
  });
  schema.set('toJSON', { virtuals: true });
  schema.set('toObject', { virtuals: true });
};

//TODO : Delete blow

export const getTweets = () => {
  return db.collection('tweets');
};
