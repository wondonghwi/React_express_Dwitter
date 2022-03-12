import mysql from 'mysql2';
import { config } from '../config.js';
import SQ from 'sequelize';

const { host, user, database, password } = config.db;
export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: 'mysql',
});

//TODO 대체 예정
export const pool = mysql.createPool({
  host,
  user,
  database,
  password,
});

export const db = pool.promise();
