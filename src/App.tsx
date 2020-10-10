import React, { useEffect, useState } from 'react';
import { AuthActionCreators, LoginStatus } from './redux/client';
import { StateType } from './types';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { firebase, getIdToken } from './backendapi/firebase';
import { ListFormat } from 'typescript';
import AuthorizePage from './pages/AuthorizePage/AuthorizePage';
import TaskPage from './pages/TaskPage/TaskPage';
import { cookies } from './utils/utils';
import { Route, Switch } from 'react-router';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import GenericNotFound from './pages/GenericNotFound/GenericNotFound';

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

    firebase.auth().onAuthStateChanged((user) => {
      exec(user);
    });

    async function exec(user: firebase.User | null) {
      try {
        setPreload(false);

        // if user isn't null then we logged in
        if (user) {
          dispatch(
            AuthActionCreators.loginStatusUpdated(LoginStatus.LOGGED_IN)
          );

          const idToken = await getIdToken();
          dispatch(AuthActionCreators.idTokenUpdated(idToken));
          cookies.set('idToken', idToken, { path: '/' });
        } else {
          dispatch(
            AuthActionCreators.loginStatusUpdated(LoginStatus.LOGGED_OUT)
          );
        }
      } catch (error) {
        console.log('App/useEffect');
        console.log(error);
      }

      // Make idToken refresh every half an hour
      setTimeout(() => {
        getIdToken()
          .then((idToken) => {
            dispatch(AuthActionCreators.idTokenUpdated(idToken));
          })
          .catch((error) => {
            console.log('App/useEffect/setTimeout');
            console.log(error);
          });
      }, 30 * 60 * 1000);
    }
  }, []);

  // Before firebase defines wether user is loggedin or not, just return empty page
  if (preload) return <></>;

  if (loginStatus === LoginStatus.LOGGED_IN && idToken !== '') {
    // User is logged in and ready to work with backend
    if (['/login', '/register'].includes(window.location.href)) {
      console.log('@window.location.href');
      console.log(window.location.href);
      window.history.replaceState('', 'Task Manager', '/');
    }

    return (
      <Switch>
        <Route path="/" exact component={TaskPage} />
        <Route path="/login" exact component={TaskPage} />
        <Route path="/register" exact component={TaskPage} />
        <Route component={GenericNotFound} />
      </Switch>
    );
  } else {
    // User is logged out / logged in but doesnt have idToken yet
    return (
      <Switch>
        <Route path="/" exact component={AuthorizePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route component={GenericNotFound} />
      </Switch>
    );
  }
}

export default App;
