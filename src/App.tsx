import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthActionCreators, LoginStatus } from './redux/client';
import { StateType } from './types';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { firebase, getIdToken } from './backendapi/firebase';
import { ListFormat } from 'typescript';
import AuthorizePage from './pages/AuthorizePage/AuthorizePage';
import TaskPage from './pages/TaskPage/TaskPage';
import { cookies } from './utils/utils';

function App() {
  const dispatch = useDispatch();
  const [preload, setPreload] = useState(true);

  const idToken = useSelector<StateType, string>(
    (state) => state.client.idToken as string
  );

  const loginStatus = useSelector<StateType, LoginStatus>(
    (state) => state.client.loginStatus as LoginStatus
  );

  useEffect(() => {
    // cookies.set('idToken', 'magnets on!', { path: '/' });
    axios.get('http://localhost:4000/tasks', { withCredentials: true });

    // firebase.auth().onAuthStateChanged((user) => {
    //   exec(user);
    // });

    // async function exec(user: firebase.User | null) {
    //   try {
    //     setPreload(false);

    //     // if user isn't null then we logged in
    //     if (user) {
    //       dispatch(
    //         AuthActionCreators.loginStatusUpdated(LoginStatus.LOGGED_IN)
    //       );
    //     } else {
    //       dispatch(
    //         AuthActionCreators.loginStatusUpdated(LoginStatus.LOGGED_OUT)
    //       );
    //     }

    //     const idToken = await getIdToken();
    //     dispatch(AuthActionCreators.idTokenUpdated(idToken));
    //     cookies.set('idToken', idToken, { path: '/' });
    //   } catch (error) {
    //     console.log('App/useEffect');
    //     console.log(error);
    //   }

    //   // Make idToken refresh every half an hour
    //   setTimeout(() => {
    //     getIdToken()
    //       .then((idToken) => {
    //         dispatch(AuthActionCreators.idTokenUpdated(idToken));
    //       })
    //       .catch((error) => {
    //         console.log('App/useEffect/setTimeout');
    //         console.log(error);
    //       });
    //   }, 30 * 60 * 1000);
    // }
  }, []);

  // Before firebase defines wether user is loggedin or not, just return empty page
  if (preload) return <></>;

  if (loginStatus === LoginStatus.LOGGED_IN) {
    if (idToken === '') {
      // User is logged in but not ready to work with backend
      return <></>;
    } else {
      // User is logged in and ready to work with backend
      return <TaskPage />;
    }
  } else {
    // User is logged out
    return <AuthorizePage />;
  }
}

export default App;
