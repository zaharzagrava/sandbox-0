import { Sequelize, DataTypes } from 'sequelize';

import { sequelize } from '../db';

export const Client = sequelize.define(
  'client',
  {
    client_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    tableName: 'client',
  }
);
