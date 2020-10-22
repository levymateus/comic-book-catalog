import {
  ComicsActionTypes, Query, FETCH_COMICS, PAGINATE_COMICS, RESET_COMICS,
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
