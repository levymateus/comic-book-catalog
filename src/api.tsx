import axios from 'axios';

const PUBLIC_KEY = 'd0402bfbae37b86d75a4907d18ca6f05';

const api = axios.create({
  baseURL: '//gateway.marvel.com',
  params: {
    apikey: PUBLIC_KEY,
  },
  timeout: 15000,
  method: 'get',
  responseType: 'json',
});

/**
 * Fetch comics by query params.
 * @param params the query parameters.
 * @see https://developer.marvel.com/docs
 */
export const fetchComics = async (params: any): Promise<any> => {
  const url = '/v1/public/comics';
  const response = await api.get(url, { params });
  return response.data;
};

/**
 * Get an comic by id.
 * @param comicId - the comicId
 * @see https://developer.marvel.com/docs
 */
export const getComic = async (comicId: string): Promise<any> => {
  const url = `/v1/public/comics/${comicId}`;
  const response = await api.get(url);
  return response.data;
};

/**
 * Fetch charactesr by query params.
 * @param params - the query parameters.
 * @see https://developer.marvel.com/docs
 */
export const fetchCharacter = async (params: any): Promise<any> => {
  const url = '/v1/public/characters';
  const response = await api.get(url, { params });
  return response.data;
};
