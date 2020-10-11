import Cookies from 'universal-cookie';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FilterOptions, TaskDT } from '../types';

export const cookies = new Cookies();

library.add(faTrash, faEdit);

export function sortTasks(
  tasks: TaskDT[],
  filterOption: FilterOptions
): TaskDT[] {
  return tasks.sort((elem0, elem1) => {
    switch (filterOption) {
      case FilterOptions.ACTIVE_FIRST:
        if (elem0.is_done === undefined) return 1;
        if (elem1.is_done === undefined) return -1;

        return elem0.is_done < elem1.is_done ? 1 : -1;
      case FilterOptions.COMPLETED_FIRST:
        if (elem0.is_done === undefined) return 1;
        if (elem1.is_done === undefined) return -1;

        return elem0.is_done < elem1.is_done ? -1 : 1;
      case FilterOptions.DURATION_DATE:
        if (elem0.due_date === undefined) return 1;
        if (elem1.due_date === undefined) return -1;

        return elem0.due_date < elem1.due_date ? -1 : 1;
      case FilterOptions.PRIORITY:
        if (elem0.task_priority === undefined) return 1;
        if (elem1.task_priority === undefined) return -1;

        return elem0.task_priority < elem1.task_priority ? -1 : 1;
      default:
        return 0;
    }
  });
}
