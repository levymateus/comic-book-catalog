import { all } from 'redux-saga/effects';

import comics from './comics';

export default function* sagas() {
  yield all([comics()]);
}
