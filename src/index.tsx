import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Importing CSS Styles
import './utils/global/global.css';

// --- Importing Redux
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './redux/';

// Importing React Query Dev Tools
import { ReactQueryDevtools } from 'react-query-devtools';

// --- Setting up Redux & Redux Dev Tools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, composeEnhancers());

ReactDOM.render(
  <>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
    <ReactQueryDevtools />
  </>,
  document.getElementById('root')
);
