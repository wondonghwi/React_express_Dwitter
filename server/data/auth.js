import { getUsers } from '../db/database.js';
import MongoDb from 'mongodb';
const ObjectId = MongoDb.ObjectId;

const mapOptionalUser = user => {
  return user ? { ...user, id: user._id } : user;
};

export const findByUsername = async username => {
  return getUsers()
    .findOne({ username })
    .then(data => mapOptionalUser(data));
};

export const findById = async id => {
  return getUsers()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalUser);
};

export const createUser = async user => {
  return getUsers()
    .insertOne(user)
    .then(data => data.insertedId.toString());
};
