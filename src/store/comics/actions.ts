import {
  ComicsActionTypes, Query, FETCH_COMICS, PAGINATE_COMICS, RESET_COMICS, PUT_ERROR,
} from './types';

export function fetchComics(query: Query): ComicsActionTypes {
  return {
    type: FETCH_COMICS,
    query,
  };
}

export function paginateComics(query: Query): ComicsActionTypes {
  return {
    type: PAGINATE_COMICS,
    ...query,
  };
}

export function resetComics(): ComicsActionTypes {
  return {
    type: RESET_COMICS,
  };
}

export function putError(errorCode: number): ComicsActionTypes {
  return {
    type: PUT_ERROR,
    errorCode,
  };
}
