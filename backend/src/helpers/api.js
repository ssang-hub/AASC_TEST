import axios from 'axios';
import { tokens, updateToken } from './file';

/**
 * @return {Promise<any>}
 */
const crateClient = () => {
  const newClient = axios.create({
    timeout: 60000,
  });
  newClient.interceptors.request.use(
    async (config) => {
      config.params = {
        ...config.params,
        auth: tokens.access_token,
      };
      return config;
    },
    (error) => Promise.reject(error),
  );
  newClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error.config;

      if (error.response.status === 401) {
        const token = await refreshToken();
        prevRequest.params = {
          ...prevRequest.params,
          auth: token,
        };
        return axios(prevRequest);
      }
      if (error.response.status === 408) {
        return new Error(' Request Timeout');
      }
    },
  );

  return newClient;
};

/**
 * @return {(action: string, payload?: {body?, method?: 'GET' | 'POST'}) => Promise<any>}
 */
const createApi = () => {
  const sendRequest = async (action, payload) => {
    return client
      .request({
        headers: {
          accept: 'application/json',
        },
        url: `${process.env.BITRIX24_REST_URL}${action}`,
        method: payload.method || 'POST',
        data: payload.body,
      })
      .then((res) => res.data.result);
  };

  return async (action, payload = {}) => sendRequest(action, payload);
};

/**
 * @return {Promise<any>}
 */
const refreshToken = async () => {
  try {
    const { data } = await axios.request({
      method: 'GET',
      url: `${process.env.BITRIX24_OAUTH_URL}`,
      params: {
        grant_type: 'refresh_token',
        client_id: process.env.BITRIX24_CLIENT_ID,
        client_secret: process.env.BITRIX24_CLIENT_SECRET,
        refresh_token: tokens.refresh_token,
      },
    });
    const { access_token, refresh_token } = data;
    updateToken({ access_token, refresh_token });
    return access_token;
  } catch (error) {
    return error;
  }
};

export const api = createApi();
export const client = crateClient();
