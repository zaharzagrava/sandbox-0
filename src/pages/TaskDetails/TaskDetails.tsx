import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTasks } from '../../backendapi/rest';
import { ClientActionCreators } from '../../redux/client';
import { NTask, StateType, TaskDT } from '../../types';
import ReactModal from 'react-modal';

// interface Props {}

function TaskDetails(): ReactElement {
  const dispatch = useDispatch();

  const taskDetails = useSelector<
    StateType,
    { isOpen: boolean; taskId?: number }
  >(
    (state) => state.client.taskDetails as { isOpen: boolean; taskId?: number }
  );

  let { data: tasks, status, error } = useGetTasks(NTask, {});

  if (!taskDetails.isOpen) return <></>;

  // Check if query is still loading
  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  if (taskDetails.taskId === undefined) {
    return <>taskId must be defined!</>;
  }

  tasks = tasks as TaskDT[];
  const task = tasks.find((elem) => elem.id === taskDetails.taskId) as TaskDT;

  async function onClose(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    dispatch(ClientActionCreators.taskDetailsUpdated(false));
  }
  return (
    <ReactModal isOpen={taskDetails.isOpen} onRequestClose={onClose}>
      <div className="container">
        <div className="row py-3">
          <div className="col d-flex justify-content-end">
            <button onClick={onClose} className="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
        <h4 className="row py-2">{task.title}</h4>
        <p className="row py-2">{task.task_description}</p>
        <p className="row py-2">{task.is_done ? 'Done' : 'Active'}</p>
        <p className="row py-2">{task.task_priority}</p>
        <p className="row py-2">{task.due_date}</p>
      </div>
    </ReactModal>
  );
}

export default TaskDetails;
