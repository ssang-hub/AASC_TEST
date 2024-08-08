import axios from "axios";

export const client = axios.create({ timeout: 60000 });
export const api = createApi();

/**
 * @return {(uri: string, options?: {headers?, body?, method?: 'GET' | 'POST' | 'PUT' | 'DELETE'}) => Promise<any>}
 */
function createApi() {
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
}
