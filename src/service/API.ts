import axios, { AxiosResponse } from "axios";

import { Data } from "../types/types";

const initialKey = "HAvHXEZ0KtNXxQOXDljw57wUb61ICv-qsBgFeic7jPY";

const API = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: `Client-ID ${initialKey}`,
  },
});

const fetchData = async (
  query: string = "",
  page: number = 1,
  per_page: number = 12
): Promise<Data> => {
  const { data } = await API.get<Data>("search/photos", {
    params: { query, page, per_page },
  });
  return data;
};

export default fetchData;
