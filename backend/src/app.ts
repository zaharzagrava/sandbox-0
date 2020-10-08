import express, { Application, NextFunction, Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import compression from 'compression';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

const main = async () => {
  const app: Application = express();

  /* Check whether env variables are provided*/
  if (process.env.PGDATABASE === undefined)
    throw new Error('process.env.PGDATABASE === undefined');

  if (process.env.PGUSER === undefined)
    throw new Error('process.env.PGUSER === undefined');

  if (process.env.PGPASSWORD === undefined)
    throw new Error('process.env.PGPASSWORD === undefined');

  if (process.env.PGHOST === undefined)
    throw new Error('process.env.PGHOST === undefined');

  const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD,
    {
      host: process.env.PGHOST,
      dialect: 'postgres',
    }
  );

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  app.use('*', cors());
  app.use(compression());
  app.use(express.json()); // allow app toaccept json

  app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello');
  });

  // sign up (POST)
  app.post('/signup', (req: Request, res: Response, next: NextFunction) => {
    res.send('1');
  });

  // username / email / password cannot be blank
  // passsword > 6 chars

  // title / description cannot be blank

  // sign in (GET)
  app.get('/signin', (req: Request, res: Response, next: NextFunction) => {
    res.send('2');
  });

  // sign out (GET)
  app.get('/signout', (req: Request, res: Response, next: NextFunction) => {
    res.send('3');
  });

  app.listen(process.env.port || 4000, () => {
    console.log(
      `Express server is listening on port ${process.env.port || 4000}`
    );
  });
};

main();
