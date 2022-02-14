import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구

import App from './App';
import GlobalStyle from './assets/styles';
import { createStore } from 'redux';
import rootReducer from './store';

const store = createStore(rootReducer, composeWithDevTools());

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
