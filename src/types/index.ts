/* Root Reducer Type */
import rootReducer from '../redux/index';

export type StateType = ReturnType<typeof rootReducer>;

/* Server data types */
export interface ClientDT {
  id: number;
  client_name?: string;
  email?: string;
  client_password?: string;
  confirmed_at?: Date;
}

export interface TaskDT {
  id: number;
  title?: string;
  task_description?: string;
  is_done?: boolean;
  task_priority?: number;
  due_date?: Date;
}

export type ServerDataType = ClientDT | TaskDT;

export const NClient = 'client';
export const NTask = 'task';

export type NamesDataType = typeof NClient | typeof NClient;

/* Form Data Types */
export interface RegisterDT {
  client_name: string;
  email: string;
  client_password: string;
}

export interface LoginDT {
  email: string;
  client_password: string;
}

/* REST Queries Types */
export interface GetTasksArgs {}

export interface PostTaskArgs {
  title?: string;
  task_description?: string;
  is_done?: boolean;
  task_priority?: number;
  due_date?: Date;
}

export type PutTaskArgs = TaskDT;

export interface DeleteTaskArgs {
  id: number;
}

/* */

export enum FilterOptions {
  ACTIVE_FIRST = 'Active First',
  COMPLETED_FIRST = 'Completed First',
  DURATION_DATE = 'Duration Date',
  PRIORITY = 'Priority',
}
