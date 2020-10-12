import { Sequelize } from 'sequelize';

console.log('@1');

/* Check whether env variables are provided */
if (process.env.DATABASE_URL === undefined)
  throw new Error('process.env.DATABASE_URL === undefined');

console.log('@2');
console.log(process.env.DATABASE_URL);
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
console.log(process.env.PORT);

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  ssl: true,
});
