import { put, takeLatest } from 'redux-saga/effects';
import compact from 'compact-object';
import { FETCH_COMICS, PUT_COMICS } from '../store/comics/types';

import * as API from '../api';
import { putError } from '../store/comics/actions';

function* fetchComics(action: any): Generator<unknown, any, any> {
  try {
    const response = yield API.fetchComics({
      ...compact(action.query),
      formatType: 'comic',
    });
    if (response.code === 200) {
      yield put({
        type: PUT_COMICS,
        meta: {
          limit: response.data.limit,
          offset: response.data.offset,
          total: response.data.total,
          count: response.data.count,
        },
        comics: response.data.results,
      });
      yield put(putError(0));
    }
  } catch (error) {
    if (error.message === 'Request failed with status code 409') {
      yield put(putError(409));
    } else if (error.code === 'ECONNABORTED') {
      yield put(putError(1));
    } else {
      // unknown error: show an default error message
      yield put(putError(-1));
    }
  }
}

export default function* comics() {
  yield takeLatest(FETCH_COMICS, fetchComics);
}
