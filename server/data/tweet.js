import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';

const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Tweet = sequelize.define('tweet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
//Tweet테이블은 User테이블에 포함된다(종속된다) -> DB가 알아서 Tweet테이블에 외래키 UserId 생성 (modelName + Id)
Tweet.belongsTo(User);

// SQL
// const SELECT_JOIN =
//   'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id';
// const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

//ORM
const INCLUDE_USER = {
  attributes: [
    'id',
    'text',
    'createdAt',
    'userId',
    [Sequelize.col('user.name'), 'name'],
    [Sequelize.col('user.username'), 'username'],
    [Sequelize.col('user.url'), 'url'],
  ],
  include: {
    model: User,
    attributes: [],
  },
};

const ORDER_DESC = {
  order: [['createdAt', 'DESC']],
};

export const getAll = async () => {
  return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC, raw: true });
  // return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then(result => result[0]);
};

export const getAllByUsername = async username => {
  return Tweet.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: {
      ...INCLUDE_USER.include,
      where: { username },
    },
    raw: true,
  });
  // return db.execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]).then(result => result[0]);
};

export const getById = async id => {
  return Tweet.findOne({
    where: { id },
    ...INCLUDE_USER,
  });
  // return db.execute(`${SELECT_JOIN} WHERE tw.id=?`, [id]).then(result => result[0][0]);
};

export const create = async (text, userId) => {
  return Tweet.create({ text, userId }).then(data => getById(data.dataValues.id));
  // return db
  //   .execute('INSERT INTO tweets (text, createdAt, userId) VALUES(?,?,?)', [text, new Date(), userId])
  //   .then(result => getById(result[0].insertId));
};

export const update = async (id, text) => {
  return Tweet.findByPk(id, INCLUDE_USER).then(tweet => {
    tweet.text = text;
    return tweet.save();
  });
  // return db.execute('UPDATE tweets SET text=? WHERE id=?', [text, id]).then(() => getById(id));
};

export const remove = async id => {
  return Tweet.findByPk(id).then(tweet => {
    tweet.destroy();
  });
  // db.execute('DELETE FROM tweets WHERE id=?', [id])
};
