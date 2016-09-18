import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'core/App';

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import rootReducer from 'core/reducers'

let store = createStore(
  rootReducer,
  window.devToolsExtension && window.devToolsExtension()
);

const rootEl = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    <Provider store={ store }>
      <App />
    </Provider>
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./core/App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./core/App').default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={ store }>
         <NextApp />
        </Provider>
      </AppContainer>,
      rootEl
    );
  });
}
