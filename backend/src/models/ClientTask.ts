import { Sequelize, DataTypes } from 'sequelize';

import { sequelize } from '../db';
import { Client } from './Client';
import { Task } from './Task';

export const ClientTask = sequelize.define(
  'client_task',
  {
    client_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Client,
        key: 'id',
      },
    },
    task_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Task,
        key: 'id',
      },
    },
  },
  {
    freezeTableName: true,
    tableName: 'client_task',
  }
);

Client.belongsToMany(Task, { through: ClientTask, foreignKey: 'client_id' });
Task.belongsToMany(Client, { through: ClientTask, foreignKey: 'task_id' });
