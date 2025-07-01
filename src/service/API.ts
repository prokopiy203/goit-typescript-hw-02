import axios, { AxiosResponse } from "axios";

const initialKey = "HAvHXEZ0KtNXxQOXDljw57wUb61ICv-qsBgFeic7jPY";

const API = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: `Client-ID ${initialKey}`,
  },
});

interface Photo {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
}

interface SearchResponse {
  results: Photo[];
  total: number;
  total_pages: number;
}

const fetchData = async (
  query: string = "",
  page: number = 1,
  per_page: number = 12
): Promise<AxiosResponse<SearchResponse>> => {
  const response = await API.get<SearchResponse>("search/photos", {
    params: { query, page, per_page },
  });
  return response;
};

export default fetchData;
