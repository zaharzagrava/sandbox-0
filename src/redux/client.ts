import produce from 'immer';

// Action Types
export const LOGIN_STATUS_UPDATED = 'LOGIN_STATUS_UPDATED';
export const ID_TOKEN_UPDATED = 'ID_TOKEN_UPDATED';

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

export type AuthAction = LoginStatusUpdated | IdTokenUpdated;

export interface Auth {
  loginStatus: LoginStatus;
  idToken: string;
}

const initialState: Auth = {
  loginStatus: LoginStatus.LOGGED_OUT,
  idToken: '',
};

export default produce((draft: Auth, action: AuthAction) => {
  switch (action.type) {
    case LOGIN_STATUS_UPDATED:
      draft.loginStatus = action.payload;
      return;

    case ID_TOKEN_UPDATED:
      draft.idToken = action.payload;
      return;

    default:
      return;
  }
}, initialState);

export const AuthActionCreators = {
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
};
