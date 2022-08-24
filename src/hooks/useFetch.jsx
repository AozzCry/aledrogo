import { useState, useCallback } from "react";
import axios from "axios";
import API from "../env";

axios.defaults.baseURL = API;

export default function useFetch(url, method = "GET", data = null) {
  const [resData, setResData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProc = async () => {
    try {
      const res = await axios.request({
        data,
        method,
        url,
        withCredentials: true,
      });
      console.log(method + " " + url + " " + res.statusText);
      setResData(res.data);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
      return true;
    }
  };
  return { resData, setResData, error, loading, fetchProc };
}
