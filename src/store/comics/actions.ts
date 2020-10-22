import {
  ComicsActionTypes, Query, FETCH_COMICS, PAGINATE_COMICS, RESET_COMICS, PUT_ERROR, ComicsState,
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

/**
 * Put an error code in the store.
 * @param errorCode - the error code
 */
export function putError(errorCode: ComicsState['errorCode']): ComicsActionTypes {
  return {
    type: PUT_ERROR,
    errorCode,
  };
}
