import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement, useState } from 'react';
import { NTask, TaskDT } from '../../types';
import { useSpring, animated } from 'react-spring';
import { useDeleteTask } from '../../backendapi/rest';
import { useDispatch } from 'react-redux';
import { ClientActionCreators } from '../../redux/client';

import { useQueryCache } from 'react-query';

function Task({ id, title, is_done }: TaskDT): ReactElement {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const fade = useSpring({
    opacity: isHovered ? 1 : 0,
  });

  const [deleteTask] = useDeleteTask(undefined);

  const queryCache = useQueryCache();

  async function onDeleteTask(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    event.stopPropagation(); // stop TaskDetails from opening

    await deleteTask({ id: id });
    queryCache.invalidateQueries([NTask, {}, 'GET']);
  }

  async function onOpenTaskEditDetails(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    event.stopPropagation(); // stop TaskDetails from opening
    dispatch(ClientActionCreators.taskEditDetailsUpdated(true, id));
  }

  async function onOpenTaskDetails(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.preventDefault();

    dispatch(ClientActionCreators.taskDetailsUpdated(true, id));
  }

  return (
    <div
      className="row border my-2 py-2"
      onClick={onOpenTaskDetails}
      onMouseEnter={(e) => setIsHovered(true)}
      onMouseLeave={(e) => setIsHovered(false)}
    >
      <div className="col-auto">
        <span style={{ fontWeight: is_done ? 'bold' : 'normal' }}>{title}</span>
      </div>
      <animated.button className="col-auto" style={fade} onClick={onDeleteTask}>
        <FontAwesomeIcon icon="trash" />
      </animated.button>
      <animated.button
        className={`col-auto mx-2`}
        style={fade}
        onClick={onOpenTaskEditDetails}
      >
        <FontAwesomeIcon icon="edit" />
      </animated.button>
    </div>
  );
}

export default Task;
