import axios from 'axios';
import {
  RegisterDT,
  LoginDT,
  TaskDT,
  GetTasksArgs,
  PostTaskArgs,
  PutTaskArgs,
  DeleteTaskArgs,
} from '../types';
import { firebase } from '../backendapi/firebase';
import { useMutation, useQuery } from 'react-query';

const backendURL = 'http://localhost:4000';
const signupRoute =
  process.env.NODE_ENV === 'production' ? `/signup` : `${backendURL}/signup`;
const tasksRoute =
  process.env.NODE_ENV === 'production' ? `/tasks` : `${backendURL}/tasks`;

export async function register(values: RegisterDT) {
  try {
    await axios.post(signupRoute, {
      client_name: values.client_name,
      email: values.email,
      client_password: values.client_password,
    });
  } catch (error) {
    throw error;
  }
}

export async function login(values: LoginDT) {
  await firebase
    .auth()
    .signInWithEmailAndPassword(values.email, values.client_password)
    .catch(function (error) {
      console.log('@rest/login');
      throw error;
    });
}

export function useGetTasks(id: string, getTasksArgs: GetTasksArgs) {
  return useQuery<TaskDT[], Error>(
    [id, getTasksArgs, 'GET'],
    async (key): Promise<TaskDT[]> => {
      try {
        const response = await axios.get(tasksRoute);
        return response.data;
      } catch (error) {
        console.log('rest/useGetTasks');
        throw error;
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );
}

export function usePostTask(
  onSuccess:
    | ((data: TaskDT, variables: PostTaskArgs) => Promise<unknown> | void)
    | undefined
) {
  return useMutation<TaskDT, Error, PostTaskArgs>(
    async (values): Promise<TaskDT> => {
      try {
        const response = await axios.post(tasksRoute, values);
        return response.data;
      } catch (error) {
        console.log('rest/usePostTask');
        throw error;
      }
    },
    {
      onSuccess: onSuccess,
    }
  );
}

export function usePutTask(
  onSuccess:
    | ((data: TaskDT, variables: PutTaskArgs) => Promise<unknown> | void)
    | undefined
) {
  return useMutation<TaskDT, Error, PutTaskArgs>(
    async (values): Promise<TaskDT> => {
      try {
        return await putTask(values);
      } catch (error) {
        console.log('rest/usePutTask');
        throw error;
      }
    },
    {
      onSuccess: onSuccess,
    }
  );
}

export function useDeleteTask(
  onSuccess:
    | ((data: TaskDT, variables: DeleteTaskArgs) => Promise<unknown> | void)
    | undefined
) {
  return useMutation<TaskDT, Error, DeleteTaskArgs>(
    async (values): Promise<TaskDT> => {
      try {
        const response = await axios.delete(`${tasksRoute}/${values.id}`);
        return response.data;
      } catch (error) {
        console.log('rest/useDeleteTask');
        throw error;
      }
    },
    {
      onSuccess: onSuccess,
    }
  );
}

export async function putTask(values: TaskDT) {
  const response = await axios.put(`${tasksRoute}/${values.id}`, values);
  return response.data;
}
