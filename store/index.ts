import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createWorkerMiddleware from 'redux-worker-middleware';

import reducers from './reducers';

// const Add1Worker = require('worker!../workers/Add1Worker'); // webpack's worker-loader
// const add1Worker = new Add1Worker;

// const workerMiddleware = createWorkerMiddleware();

export function initializeStore(initialState = {}) {
  return createStore(
    combineReducers(reducers),
    initialState,
    composeWithDevTools(applyMiddleware())
  );
}
