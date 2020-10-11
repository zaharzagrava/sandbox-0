import produce from 'immer';

// Action Types
export const LOGIN_STATUS_UPDATED = 'LOGIN_STATUS_UPDATED';
export const ID_TOKEN_UPDATED = 'ID_TOKEN_UPDATED';
export const TASK_EDIT_DETAILS_UPDATED = 'TASK_EDIT_DETAILS_UPDATED';
export const TASK_DETAILS_UPDATED = 'TASK_DETAILS_UPDATED';

// Actions Interfaces
export enum LoginStatus {
  LOGGED_OUT,
  LOGGED_IN,
}

interface LoginStatusUpdated {
  type: typeof LOGIN_STATUS_UPDATED;
  payload: LoginStatus;
}

interface IdTokenUpdated {
  type: typeof ID_TOKEN_UPDATED;
  payload: string;
}

interface TaskEditDetailsUpdated {
  type: typeof TASK_EDIT_DETAILS_UPDATED;
  payload: {
    isOpen: boolean;
    taskId?: number;
  };
}

interface TaskDetailsUpdated {
  type: typeof TASK_DETAILS_UPDATED;
  payload: {
    isOpen: boolean;
    taskId?: number;
  };
}

export type ClientAction =
  | LoginStatusUpdated
  | IdTokenUpdated
  | TaskEditDetailsUpdated
  | TaskDetailsUpdated;

export interface Client {
  loginStatus: LoginStatus;
  idToken: string;
  taskEditDetails: {
    isOpen: boolean;
    taskId?: number;
  };
  taskDetails: {
    isOpen: boolean;
    taskId?: number;
  };
}

const initialState: Client = {
  loginStatus: LoginStatus.LOGGED_OUT,
  idToken: '',
  taskEditDetails: {
    isOpen: false,
    taskId: undefined,
  },
  taskDetails: {
    isOpen: false,
    taskId: undefined,
  },
};

export default produce((draft: Client, action: ClientAction) => {
  switch (action.type) {
    case LOGIN_STATUS_UPDATED:
      draft.loginStatus = action.payload;
      return;
    case ID_TOKEN_UPDATED:
      draft.idToken = action.payload;
      return;
    case TASK_EDIT_DETAILS_UPDATED:
      draft.taskEditDetails = action.payload;
      return;
    case TASK_DETAILS_UPDATED:
      draft.taskDetails = action.payload;
    default:
      return;
  }
}, initialState);

export const ClientActionCreators = {
  loginStatusUpdated: function (
    loginInStatus: LoginStatus
  ): LoginStatusUpdated {
    return {
      type: LOGIN_STATUS_UPDATED,
      payload: loginInStatus,
    };
  },
  idTokenUpdated: function (idToken: string): IdTokenUpdated {
    return {
      type: ID_TOKEN_UPDATED,
      payload: idToken,
    };
  },
  // -1 for create mode | id of the task for edit mode
  taskEditDetailsUpdated: function (
    isOpen: boolean,
    taskId?: number
  ): TaskEditDetailsUpdated {
    return {
      type: TASK_EDIT_DETAILS_UPDATED,
      payload: { isOpen, taskId },
    };
  },
  taskDetailsUpdated: function (
    isOpen: boolean,
    taskId?: number
  ): TaskDetailsUpdated {
    return {
      type: TASK_DETAILS_UPDATED,
      payload: { isOpen, taskId },
    };
  },
};
