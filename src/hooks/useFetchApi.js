import { useEffect, useState } from "react";
import { api } from "../helpers/api";
import queryString from "query-string";

/**
 * useFetchApi hook for fetch data from api with url
 *
 * @param {string} url
 * @param defaultData
 * @param {boolean} initLoad
 * @param initQueries
 * @returns {{ data, setData, fetchApi, loading}}
 */
export default function useFetchApi({
  url,
  defaultData = [],
  initLoad = true,
  initQueries = {},
}) {
  const [loading, setLoading] = useState(initLoad);
  const [fetched, setFetched] = useState(false);
  const [data, setData] = useState(defaultData);

  async function fetchApi(apiUrl, params = null) {
    try {
      setLoading(true);
      const path = apiUrl || url;
      const separateChar = path.includes("?") ? "&" : "?";
      const query = params ? separateChar + queryString.stringify(params) : "";
      const resp = await api(path + query);

      if (resp.hasOwnProperty("result")) {
        console.log(resp.result);

        setData(resp.result);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setFetched(true);
    }
  }

  const refetchApi = (params) => {
    fetchApi(url, { params, ...initQueries });
  };

  useEffect(() => {
    if (initLoad && !fetched) {
      fetchApi(url, initQueries).then(() => {});
    }
  }, []);

  return {
    refetchApi,
    data,
    setData,
    loading,
  };
}
