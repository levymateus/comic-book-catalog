import { Reducer } from 'react';
import {
  applyMiddleware, createStore,
} from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import createSagaMiddleware from 'redux-saga';

import reducers from '../reducer';
import sagas from '../saga';

const preloadedState = {};

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({ serialize: { map: true } });
const store = createStore<Reducer<unknown, unknown>, any, any, any>(
  // @ts-ignore
  reducers,
  preloadedState,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(sagas);

export default store;
