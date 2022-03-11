import { db } from '../db/database.js';

const SELECT_JOIN =
  'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id';
const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

export const getAll = async () => {
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then(result => result[0]);
};

export const getAllByUsername = async username => {
  return db.execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]).then(result => result[0]);
};

export const getById = async id => {
  return db.execute(`${SELECT_JOIN} WHERE tw.id=?`, [id]).then(result => result[0][0]);
};

export const create = async (text, userId) => {
  return db
    .execute('INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)', [text, new Date(), userId])
    .then(result => getById(result[0].insertId));
};

export const update = async (id, text) => {
  return db.execute('UPDATE tweets SET text=? WHERE id=?', [text, id]).then(() => getById(id));
};

export const remove = async id => {
  return db.execute('DELETE FROM tweets WHERE id=?', [id]);
};
