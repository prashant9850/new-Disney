import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3";
const api_key = "6ac39e06333221a20a7b6aedf62f04e1";

const movieByGenreBaseURL = `${movieBaseUrl}/discover/movie?api_key=${api_key}`;

const getTrendingVideos = () =>
  axios.get(`${movieBaseUrl}/trending/all/day?api_key=${api_key}`);

const getMovieByGenreId = (id) =>
  axios.get(`${movieByGenreBaseURL}&with_genres=${id}`);

export default {
  getTrendingVideos,
  getMovieByGenreId,
};
