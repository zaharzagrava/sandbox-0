import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { firebase } from './backendapi/firebase';

// Importing CSS Styles
import './utils/global/global.scss';
import 'react-datepicker/dist/react-datepicker.css';

import './utils/utils';

// --- Importing Redux
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './redux/';

// Importing React Query Dev Tools
import { ReactQueryDevtools } from 'react-query-devtools';

// Importing react-router-dom
import { BrowserRouter } from 'react-router-dom';

// --- Setting up Redux & Redux Dev Tools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, composeEnhancers());

// firebase.auth().signOut();

ReactDOM.render(
  <>
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
    <ReactQueryDevtools />
  </>,
  document.getElementById('root')
);
