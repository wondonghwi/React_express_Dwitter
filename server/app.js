import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import { config } from './config.js';
import { initSocket } from './connection/socket.js';
import { connectDB } from './db/database.js';

const app = express();

//미들웨어 사용
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());

//라우터 prefix
app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

// 오류처리기
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something broke!');
});

connectDB()
  .then(() => {
    const server = app.listen(config.host.port);
    initSocket(server);
  })
  .catch(console.error);
