// src/store/chat/types.ts
export const FETCH_COMICS = 'FETCH_COMICS';
export const PUT_COMICS = 'PUT_COMICS';
export const PAGINATE_COMICS = 'PAGINATE_COMICS';
export const RESET_COMICS = 'RESET_COMICS';

export interface Comic {
  id: number;
  name: string;
}

export interface ComicsState {
  meta: {
    limit: number;
    offset: number;
    total: number;
    count: number;
  }
  comics: [][];
  isLoading: boolean;
  query: {
    characters: string,
  };
}

export interface Query {
  limit: number;
  offset: number;
  characters?: string;
}

export interface Paginate {
  type: typeof PAGINATE_COMICS;
  limit: number;
  offset: number;
}

interface FetchComics {
  type: typeof FETCH_COMICS;
  query: Query;
}

interface PutComics {
  type: typeof PUT_COMICS;
  meta: {
    limit: number;
    offset: number;
    total: number;
    count: number;
  }
  comics: Comic[];
}

interface ResetComics {
  type: typeof RESET_COMICS;
}

export type ComicsActionTypes = FetchComics | PutComics | Paginate | ResetComics;
