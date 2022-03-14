import dotenv from 'dotenv';
dotenv.config();

const required = (key, defaultValue = undefined) => {
  const value = process.env[key] || defaultValue;
  //널체킹
  if (value == null) {
    throw new Error(`key ${key} is undefined`);
  }
  return value;
};

export const config = {
  jwt: {
    secretKey: required('JWT_SECRET'),
    expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
  },
  db: {
    host: required('DB_HOST'),
    user: required('DB_USER'),
    database: required('DB_DATABASE'),
    password: required('DB_PASSWORD'),
  },
  port: parseInt(required('PORT', 8080)),
  cors: {
    allowedOrigin: required('CORS_ALLOW_ORIGIN'),
  },
};
