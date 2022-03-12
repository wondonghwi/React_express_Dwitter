import SQ from 'sequelize';
import { sequelize } from '../db/database.js';

const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
    },
  },
  { timestamps: false }
);

export const findByUsername = async username => {
  //ORM
  return User.findOne({ where: { username } });
  //SQL
  // return db.execute('SELECT * FROM users WHERE username=?', [username]).then(result => result[0][0]);
};

export const findById = async id => {
  //ORM
  return User.findByPk(id);
  //SQL
  // return db.execute('SELECT * FROM users WHERE id=?', [id]).then(result => result[0][0]);
};

export const createUser = async user => {
  //ORM
  return User.create(user).then(data => data.dataValues.id);
  //SQL
  // const { username, password, name, email, url } = user;
  // return db
  //   .execute('INSERT INTO users (username , password, name, email, url) VALUES (?,?,?,?,?)', [
  //     username,
  //     password,
  //     name,
  //     email,
  //     url,
  //   ])
  //   .then(result => result[0].insertId);
};
