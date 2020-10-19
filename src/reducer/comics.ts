/* eslint-disable no-case-declarations */
import {
  ComicsActionTypes, ComicsState, FETCH_COMICS, PAGINATE_COMICS, PUT_COMICS, RESET_COMICS,
} from '../store/comics/types';

const initialState: ComicsState = {
  meta: {
    limit: 100,
    offset: 0,
    total: 0,
    count: 1,
  },
  comics: [],
  isLoading: false,
  query: {
    characters: '',
  },
};

const comics = (state: ComicsState = initialState, action: ComicsActionTypes) => {
  switch (action.type) {
    case RESET_COMICS:
      return {
        ...initialState,
        query: {
          ...state.query,
          characters: state.query.characters,
        },
      };
    case FETCH_COMICS:
      return {
        ...state,
        meta: {
          ...state.meta,
        },
        isLoading: true,
        query: {
          characters: action.query.characters,
        },
      };
    case PUT_COMICS:
      const page = action.meta.offset / action.meta.limit;
      const copyComics = [...state.comics];
      // @ts-ignore
      copyComics[page] = action.comics;
      return {
        ...state,
        comics: copyComics,
        meta: action.meta,
        isLoading: false,
      };
    case PAGINATE_COMICS:
      return {
        ...state,
        meta: {
          ...state.meta,
          limit: action.limit,
          offset: action.offset,
        },
      };
    default:
      return state;
  }
};

export default comics;
