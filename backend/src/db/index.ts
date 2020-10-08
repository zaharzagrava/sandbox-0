import { Sequelize } from 'sequelize';

/* Check whether env variables are provided*/
if (process.env.PGDATABASE === undefined)
  throw new Error('process.env.PGDATABASE === undefined');

if (process.env.PGUSER === undefined)
  throw new Error('process.env.PGUSER === undefined');

if (process.env.PGPASSWORD === undefined)
  throw new Error('process.env.PGPASSWORD === undefined');

if (process.env.PGHOST === undefined)
  throw new Error('process.env.PGHOST === undefined');

export const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: 'postgres',
  }
);
