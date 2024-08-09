import axios from "axios";

/**
 * @return {Promise<any>}
 */
const crateClient = () => {
  const newClient = axios.create({
    timeout: 60000,
  });
  newClient.interceptors.request.use(
    async (config) => {
      const storage = JSON.parse(
        localStorage.getItem(process.env.REACT_APP_APP_NAME)
      );

      if (storage) {
        config.params = {
          ...config.params,
          auth: storage.token,
        };
      }
      return config;
    },
    (error) => Promise.reject(error)
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
    }
  );

  return newClient;
};

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

/**
 * @return {Promise<string>}
 */
const refreshToken = async () => {
  try {
    const { data } = await axios.request({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/refresh_token`,
    });
    localStorage.setItem(
      process.env.REACT_APP_APP_NAME,
      JSON.stringify({ token: data.token })
    );
    return data.token;
  } catch (error) {
    console.log(error);
  }
};

export const api = createApi();
export const client = crateClient();
