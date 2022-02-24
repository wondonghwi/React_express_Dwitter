import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import tweetsRouter from './router/tweets.js';

const app = express();

//미들웨어 사용
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());

//라우터 prefix
app.use('/tweets.js', tweetsRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

// 오류처리기
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something broke!');
});

app.listen(8080);