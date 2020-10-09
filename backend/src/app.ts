import express, { Application, NextFunction, Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import compression from 'compression';
import cors from 'cors';
import admin from 'firebase-admin';
import cookieParser from 'cookie-parser';

// has to be before every custom module
import './configuration/dotenv';

import { sequelize } from './db/';
import { Client } from './models/Client';
import { Task } from './models/Task';
import './models/ClientTask'; // create relations between models
import { ClientDT, CookiesDT, TaskDT } from './types';
import { ClientTask } from './models/ClientTask';

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

  // undefeind is to make postman agent work
  // http://localhost:3000 is to make dev version of front end to work with backend
  const whitelist = ['http://localhost:3000', undefined];
  const corsOptions = {
    origin: function (origin: any, callback: any) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(compression());
  app.use(express.json()); // allow app toaccept json
  app.use(cookieParser());
  app.use(express.static(__dirname + '/clientbuild'));
  app.use(async function (req: Request, res: Response, next: NextFunction) {
    try {
      const newClientData: ClientDT = req.body;
      const cookies: CookiesDT = req.cookies;

      // Test authorization
      if (!req.url.includes('/signup')) {
        // // Get clientId from idToken
        // let clientId = undefined;
        // if (cookies.idToken === undefined || cookies.idToken === '') {
        //   console.log('Error at: app.use(auth)');
        //   console.log(`cookies.idToken === undefined || cookies.idToken === ''`);
        //   res.send(`cookies.idToken === undefined || cookies.idToken === ''`);
        // } else {
        //   console.log('@idToken: ' + cookies.idToken);

        //   let decodedIdToken: admin.auth.DecodedIdToken = await admin
        //     .auth()
        //     .verifyIdToken(cookies.idToken);
        //   let uid = decodedIdToken.uid;

        //   let data = await Client.findAll({
        //     where: {
        //       uid: uid,
        //     },
        //   });

        //   if (data.length === 0) {
        //     throw new Error('User is not authorized');
        //   }

        //   // res.locals.clientId = data[0].id;
        //   res.locals.clientId = 5;
        // }

        res.locals.clientId = 1;
      }

      next();
    } catch (error) {
      console.log("Error at: app.post('/signup')");
      console.log(error);
      res.statusCode = 500;

      res.send(error);
    }
  });

  /* User Routes */

  // sign up (POST)
  app.post(
    '/signup',
    async (req: Request, res: Response, next: NextFunction) => {
      // TODO: check wether body is of correct form
      // username / email / password cannot be blank
      // username / email / password should be unique
      // passsword > 6 chars

      try {
        const newClientData: ClientDT = req.body;
        const cookies: CookiesDT = req.cookies;

        const newClient = await Client.create({
          client_name: newClientData.client_name,
          email: newClientData.email,
          client_password: newClientData.client_password,
        });

        console.log(newClient);

        res.json(newClient);
      } catch (error) {
        console.log("Error at: app.post('/signup')");
        console.log(error);
        res.statusCode = 500;

        res.send(error);
      }
    }
  );

  // cofirm email (GET)
  app.get('/confirm', (req: Request, res: Response, next: NextFunction) => {
    res.send('3');
  });

  // /* Task Routes */
  app.get('/tasks', async (req, res) => {
    try {
      const clientId: number = res.locals.clientId;

      // get a response about tasks
      const response = await Task.findAll<any>({
        attributes: [
          'id',
          `title`,
          `task_description`,
          `is_done`,
          `task_priority`,
          `due_date`,
        ],
        include: [
          {
            model: Client,
            required: true,
            where: {
              id: clientId,
            },
          },
        ],
      });

      // Format response from sequelize into an anppropriate format
      const tasks: TaskDT[] = [];
      for (let i = 0; i < response.length; i++) {
        tasks.push({
          id: response[i].id,
          title: response[i].title,
          task_description: response[i].task_description,
          is_done: response[i].is_done,
          task_priority: response[i].task_priority,
          due_date: response[i].due_date,
        });
      }

      res.json(tasks);
    } catch (error) {
      console.log("Error at: app.get('/tasks')");
      console.log(error);
      res.statusCode = 500;

      res.send(error);
    }
  });

  app.post('/tasks', async (req, res) => {
    try {
      // TODO: check wether body is of correct form
      const newTaskData: TaskDT = req.body;
      const clientId: number = res.locals.clientId;

      // insert record into Task table
      const newTask = await Task.create<any>({
        title: newTaskData.title,
        task_description: newTaskData.task_description,
        is_done: newTaskData.is_done,
        task_priority: newTaskData.task_priority,
        due_date: newTaskData.due_date,
      });

      // insert record into client_task table
      await ClientTask.create({
        client_id: clientId,
        task_id: newTask.id,
      });

      res.json(newTask);
    } catch (error) {
      console.log("Error at: app.post('/tasks')");
      console.log(error);
      res.statusCode = 500;
      res.send(error);
    }
  });

  app.put('/tasks/:id', async (req, res) => {
    try {
      // TODO: check wether body is of correct form
      const toUpdateTaskData: TaskDT = req.body;
      const clientId: number = res.locals.clientId;
      const taskId = req.params.id;

      const response = await Task.findOne<any>({
        attributes: ['id'],
        where: {
          id: taskId,
        },
        include: [
          {
            model: Client,
            required: true,
            where: {
              id: clientId,
            },
          },
        ],
      });

      if (response === null) {
        res.statusCode = 400;
        res.send(
          `User #${clientId} is not allowed to edit task #${taskId}, or task #${taskId} does not exist`
        );
      } else {
        // insert record into Task table
        const updatedTask = await Task.update<any>(
          {
            title: toUpdateTaskData.title,
            task_description: toUpdateTaskData.task_description,
            is_done: toUpdateTaskData.is_done,
            task_priority: toUpdateTaskData.task_priority,
            due_date: toUpdateTaskData.due_date,
          },
          {
            where: {
              id: taskId,
            },
            returning: true,
          }
        );

        res.json(updatedTask);
      }
    } catch (error) {
      console.log("Error at: app.put('/tasks:id')");
      console.log(error);
      res.statusCode = 500;
      res.send(error);
    }
  });

  app.delete('/tasks/:id', async (req, res) => {
    try {
      // TODO: check wether body is of correct form
      const clientId: number = res.locals.clientId;
      const taskId = req.params.id;

      // pres-save deleted task
      const response = await Task.findOne<any>({
        attributes: ['id'],
        where: {
          id: taskId,
        },
        include: [
          {
            model: Client,
            required: true,
            where: {
              id: clientId,
            },
          },
        ],
      });

      if (response === null) {
        res.statusCode = 400;
        res.send(
          `User #${clientId} is not allowed to edit task #${taskId}, or task #${taskId} does not exist`
        );
      } else {
        // delete record from Task table
        await Task.destroy<any>({
          where: {
            id: taskId,
          },
        });

        res.json({
          id: response.id,
          title: response.title,
          task_description: response.task_description,
          is_done: response.is_done,
          task_priority: response.task_priority,
          due_date: response.due_date,
        });
      }
    } catch (error) {
      console.log("Error at: app.delete('/tasks:id')");
      console.log(error);
      res.statusCode = 500;
      res.send(error);
    }
  });

  app.listen(process.env.PORT || 4000, () => {
    console.log(
      `Express server is listening on port ${process.env.PORT || 4000}`
    );
  });
};

main();
