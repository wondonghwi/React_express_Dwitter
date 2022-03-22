import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import { config } from './config.js';
import { initSocket } from './connection/socket.js';
import { authHandler } from './middleware/auth.js';
import { sequelize } from './db/database.js';
import yaml from 'yamljs';
import swaggerUI from 'swagger-ui-express';
import * as OpenAPiValidator from 'express-openapi-validator';
import * as apis from './controller/index.js';

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
};

const openAPIDocument = yaml.load('./api/openapi.yaml');

//미들웨어 사용
app.use(express.json());
app.use(cors(corsOption));
app.use(morgan('tiny'));
app.use(helmet());

//라우터 prefix
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openAPIDocument)); //swagger 문서 호스팅
app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);
app.use(
  OpenAPiValidator.middleware({
    apiSpec: './api/openapi.yaml',
    validateResponses: true,

    operationHandlers: {
      resolver: modulePathResolver,
    },
    validateSecurity: {
      handlers: {
        jwt_auth: authHandler,
      },
    },
  })
);

function modulePathResolver(_, route, apiDoc) {
  const pathKey = route.openApiRoute.substring(route.basePath.length);
  const operation = apiDoc.paths[pathKey][route.method.toLowerCase()];
  const methodName = operation.operationId;
  return apis[methodName];
}

app.use((req, res, next) => {
  res.sendStatus(404);
});

// 오류처리기
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message,
  });
});

//DB 실행 후 서버 시작
sequelize.sync().then(() => {
  console.log(`Server is started.... ${new Date()}`);
  const server = app.listen(config.port);
  initSocket(server);
});
