import express, { Application, NextFunction, Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import compression from 'compression';
import cors from 'cors';
import admin from 'firebase-admin';

// has to be before every custom module
import './configuration/dotenv';

import { sequelize } from './db/';
import { Client } from './models/Client';
import { Task } from './models/Task';

const main = async () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  }

  const app: Application = express();

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  app.use('*', cors());
  app.use(compression());
  app.use(express.json()); // allow app toaccept json

  app.use(express.static(__dirname + '/build'));

  app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello');
  });

  /* User Routes */

  // sign up (POST)
  app.post(
    '/signup',
    async (req: Request, res: Response, next: NextFunction) => {
      // TODO: check whther body is of correct form
      // username / email / password cannot be blank
      // username / email / password should be unique
      // passsword > 6 chars

      console.log('@1');
      console.log(req.body);

      try {
        const newClient = await Client.create({
          client_name: req.body.client_name,
          email: req.body.email,
          client_password: req.body.client_password,
        });

        res.json(newClient);
      } catch (error) {
        console.log("Error at: app.post('/signup')");
        console.log(error);
        res.send(error);
      }
    }
  );

  // sign in (GET)
  app.get('/signin', (req: Request, res: Response, next: NextFunction) => {
    res.send('2');
  });

  // sign out (GET)
  app.get('/signout', (req: Request, res: Response, next: NextFunction) => {
    res.send('3');
  });

  // cofirm email (GET)
  app.get('/confirm', (req: Request, res: Response, next: NextFunction) => {
    res.send('3');
  });

  // /* Task Routes */
  // app.get('/tasks', (req, res) => {
  //   // get a task
  //   const tasks = req.body;

  //   console.log('@1');
  //   console.log(req.query);

  //   // code to retrieve an article...
  //   res.json(tasks);
  // });

  // app.post('/tasks', (req, res) => {
  //   // add a task
  //   // code to add a new article...
  //   res.json(req.body);
  // });

  // app.put('/tasks/:id', (req, res) => {
  //   // edit a task
  //   const { id } = req.params;
  //   // code to update an article...
  //   res.json(req.body);
  // });

  // app.delete('/tasks/:id', (req, res) => {
  //   // delete a task
  //   const { id } = req.params;
  //   // code to delete an article...
  //   res.json({ deleted: id });
  // });

  app.listen(process.env.port || 4000, () => {
    console.log(
      `Express server is listening on port ${process.env.port || 4000}`
    );
  });

  // function getClientIdByIdToken() {
  //   // Get clientId from idToken
  //   let uid = null;
  //   if (args.idToken === undefined) {
  //     throw new Error('No idToken is provided');
  //   } else {
  //     console.log('@idToken: ' + args.idToken);

  //     let decodedIdToken: admin.auth.DecodedIdToken = await admin
  //       .auth()
  //       .verifyIdToken(args.idToken);
  //     uid = decodedIdToken.uid;

  //     console.log('@uid');
  //     console.log(uid);

  //     let data = await context
  //       .knexConnection('client')
  //       .select()
  //       .where('uid', uid);

  //     if (data.length === 0) {
  //       console.log('@data.length === 0');
  //       const fields = {
  //         full_name: 'New User',
  //         uid: uid,
  //       };

  //       // Register new user
  //       data = await context.knexConnection('client').insert(fields, ['id']);
  //     }

  //     console.log('@clientData');
  //     console.log(data);

  //     return data[0].id;
  //   }
  // }
};

main();
