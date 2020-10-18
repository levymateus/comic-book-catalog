import { put, takeLatest } from 'redux-saga/effects';
import compact from 'compact-object';
import { FETCH_COMICS, PUT_COMICS } from '../store/comics/types';

import * as API from '../api';

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
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

export default function* comics() {
  yield takeLatest(FETCH_COMICS, fetchComics);
}
