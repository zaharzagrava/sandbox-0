import React, { ReactElement, useState } from 'react';
import { putTask, useGetTasks } from '../../backendapi/rest';
import { FilterOptions as SortOptions, NTask, TaskDT } from '../../types';
import Task from '../Task/Task';
import TaskEditDetails from '../TaskEditDetails/TaskEditDetails';
import TaskDetails from '../TaskDetails/TaskDetails';
import { sortTasks } from '../../utils/utils';
import { ClientActionCreators } from '../../redux/client';
import { useDispatch } from 'react-redux';

import { firebase } from '../../backendapi/firebase';
import { queryCache } from 'react-query';

// interface Props {}

function TaskPage(): ReactElement {
  const [sortOption, setSortOption] = useState(SortOptions.ACTIVE_FIRST);
  let { data: tasks, status, error } = useGetTasks(NTask, {});
  const dispatch = useDispatch();

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  tasks = tasks as TaskDT[];

  sortTasks(tasks, sortOption);

  async function onMarkAllUnDone(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();

    if (tasks === undefined) return;

    const putTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      putTasks.push(
        putTask({
          id: task.id,
          is_done: false,
        })
      );
    }

    await Promise.all(putTasks);

    queryCache.invalidateQueries([NTask, {}, 'GET']);
  }

  async function onMarkAllDone(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();

    if (tasks === undefined) return;

    const putTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      putTasks.push(
        putTask({
          id: task.id,
          is_done: true,
        })
      );
    }

    await Promise.all(putTasks);

    queryCache.invalidateQueries([NTask, {}, 'GET']);
  }

  async function onOpenTaskCreateDetails(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    dispatch(ClientActionCreators.taskEditDetailsUpdated(true, undefined));
  }

  return (
    <>
      <div className="container my-4">
        <div className="row">
          <button className="btn btn-primary" onClick={onOpenTaskCreateDetails}>
            Create a task
          </button>

          <div className="form-group">
            <select
              className="form-control"
              id="sel1"
              onChange={(e) => {
                switch (e.target.value) {
                  case SortOptions.COMPLETED_FIRST:
                    setSortOption(SortOptions.COMPLETED_FIRST);
                    break;
                  case SortOptions.DURATION_DATE:
                    setSortOption(SortOptions.DURATION_DATE);
                    break;
                  case SortOptions.PRIORITY:
                    setSortOption(SortOptions.PRIORITY);
                    break;
                  default:
                    setSortOption(SortOptions.ACTIVE_FIRST);
                    break;
                }
              }}
            >
              <option>{SortOptions.ACTIVE_FIRST}</option>
              <option>{SortOptions.COMPLETED_FIRST}</option>
              <option>{SortOptions.DURATION_DATE}</option>
              <option>{SortOptions.PRIORITY}</option>
            </select>
          </div>

          <button className="btn btn-primary" onClick={onMarkAllDone}>
            Mark all as Done
          </button>
          <button className="btn btn-primary" onClick={onMarkAllUnDone}>
            Mark all as Undone
          </button>
        </div>
        {tasks.map((task, index) => {
          return (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              is_done={task.is_done}
            />
          );
        })}
        <div className="row my-4 d-flex justify-content-center">
          {firebase.auth().currentUser?.emailVerified || (
            <button
              className="btn btn-primary"
              onClick={(e) => {
                firebase
                  .auth()
                  .currentUser?.sendEmailVerification()
                  .then(function () {})
                  .catch(function (error) {
                    console.log('pages/TaskPage/Email Verification');
                    throw error;
                  });
              }}
            >
              Verify Email
            </button>
          )}
        </div>
      </div>
      <TaskEditDetails />
      <TaskDetails />
    </>
  );
}

export default TaskPage;
