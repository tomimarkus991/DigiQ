import { COOKIE_NAME, __prod__ } from './constants';
import 'reflect-metadata';
import 'dotenv-safe/config';
import path from 'path';
import * as http from 'http';
import express from 'express';
import session from 'express-session';
import { ApolloServer } from 'apollo-server-express';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import { ConnectionOptions, createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { Hello } from './hello/entities/hello.entity';
import { HelloResolver } from './hello/hello.resolver';

const main = async () => {
  const config: ConnectionOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [Hello],
  };
  try {
    await createConnection({ ...config });
    // let conn = await createConnection({ ...config });
    // Userwaiting.delete({}).then(() =>
    //   Queue.delete({}).then(() => console.log('deleted')),
    // );

    // User.delete({});
    // CreatorUser.delete({});
    // await conn.runMigrations();
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.set('trust proxy', 1);

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis as any,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? '.codesendace.com' : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });
  apolloServer.applyMiddleware({
    app,
    cors: true,
  });

  const httpServer = http.createServer(app);

  httpServer.listen(parseInt(process.env.PORT), () =>
    console.log(`Server is running on ${process.env.PORT} `),
  );
};

main().catch(err => console.error(err));
