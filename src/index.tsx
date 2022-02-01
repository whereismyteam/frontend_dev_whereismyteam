import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './assets/styles';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
