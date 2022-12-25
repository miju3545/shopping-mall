import { QueryClient } from 'react-query';
import { AnyOBJ } from 'constants/types';

export const getClient = (() => {
  let client: QueryClient | null = null;

  return () => {
    if (!client) client = new QueryClient();
    return client;
  };
})();

const BASE_URL = 'https://fakestoreapi.com';

export const fetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  body?: AnyOBJ;
  params?: AnyOBJ;
}) => {
  let url = `${BASE_URL}${path}`;
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': BASE_URL,
    },
  };

  if (params) {
    const searchParams = new URLSearchParams(params);
    url += '?' + searchParams.toString();
  }
  if (body) options.body = JSON.stringify(body);

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const QueryKeys = {
  PRODUCTS: 'PRODUCTS',
};
