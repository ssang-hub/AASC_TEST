import axios from "axios";

export const client = axios.create({
  timeout: 60000,
  baseURL: process.env.REACT_APP_BASE_URL,
});

/**
 * @return {(uri: string, options?: {headers?, body?, method?: 'GET' | 'POST' | 'PUT' | 'DELETE'}) => Promise<any>}
 */
const createApi = () => {
  const sendRequest = async (uri, options) => {
    return client
      .request({
        ...options,
        headers: {
          accept: "application/json",
        },
        url: uri,
        method: options.method,
        data: options.body,
      })
      .then((res) => res.data);
  };

  return async (uri, options = {}) => sendRequest(uri, options);
};

export const api = createApi();
