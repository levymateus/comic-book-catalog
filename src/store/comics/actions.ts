import {
  ComicsActionTypes, Query, FETCH_COMICS, PAGINATE_COMICS,
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
