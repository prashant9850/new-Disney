import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "6ac39e06333221a20a7b6aedf62f04e1";

const GlobalApi = {
  getTrendingVideos: () =>
    axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`),
};

export default GlobalApi;
