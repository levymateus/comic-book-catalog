import axios from 'axios';

const PUBLIC_KEY = 'd0402bfbae37b86d75a4907d18ca6f05';
// const PRIVATE_KEY = '9e4f37e06605bd2589a333541e7372c61f57769e';

const api = axios.create({
  baseURL: '//gateway.marvel.com',
  params: {
    apikey: PUBLIC_KEY,
  },
  timeout: 60000,
  method: 'get',
  responseType: 'json',
});

export const fetchComics = async (params: any): Promise<any> => {
  const url = '/v1/public/comics';
  const response = await api.get(url, { params });
  return response.data;
};

export const fetchCharacter = async (params: any): Promise<any> => {
  const url = '/v1/public/characters';
  const response = await api.get(url, { params });
  return response.data;
};
