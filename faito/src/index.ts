import 'reflect-metadata';
import 'dotenv-safe/config';
import { COOKIE_NAME, __prod__ } from './constants';
import path from 'path';
import * as http from 'http';
import express from 'express';
import session from 'express-session';
import { ApolloServer } from 'apollo-server-express';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import { ConnectionOptions, createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { Queue } from './queue/entities/queue.entity';
import { User } from './user/entities/user.entity';
import { Waiting } from './waiting/entities/waiting.entity';
import { UserResolver } from './user/user.resolver';
import { QueueResolver } from './queue/queue.resolver';
import { WaitingResolver } from './waiting/waiting.resolver';

const main = async () => {
  const config: ConnectionOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [Queue, User, Waiting],
  };
  try {
    await createConnection({ ...config });
    // let conn = await createConnection({ ...config });
    // Waiting.delete({}).then(() =>
    //   Queue.delete({}).then(() => console.log('deleted')),
    // );

    // User.delete({});
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
        client: redis,
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
      resolvers: [QueueResolver, UserResolver, WaitingResolver],
      authChecker: async ({ context: { req } }, roles) => {
        const userId = req.session.userId;
        if (!userId) {
          return false;
        } else {
          const user = await User.findOneOrFail(userId);
          const userRoles = user.isCreator ? ['CREATOR'] : [];

          // check if roles is empty (no permissions required. user only needs to be logged in)
          if (!roles[0]) {
            // if user is then return true
            if (userId) {
              return true;
            }
          }
          // check if roles exist(not empty array)
          if (roles[0]) {
            // get arrays as strings
            let sortedUserRoles = userRoles.sort().join(',');
            let sortedRoles = roles.sort().join(',');

            // if they exist check if USERROLES array equals ROLES array
            if (sortedUserRoles === sortedRoles) {
              // if they are the same. user has rights and return true
              return true;
            } else {
              return false;
            }
          }

          return false; // or false if access is denied
        }
      },
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
    subscriptions: {
      path: '/subscriptions',
    },
  });
  apolloServer.applyMiddleware({
    app,
    cors: true,
  });

  const httpServer = http.createServer(app);

  apolloServer.installSubscriptionHandlers(httpServer);
  httpServer.listen(parseInt(process.env.PORT), () => {
    console.log(`Server is running on ${process.env.PORT} `);
  });
};

main().catch(err => console.error(err));
