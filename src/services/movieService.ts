import type { Movie } from '../types/movie';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL;

export interface MovieServiceProps {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
const fetchMovies = async (
  query: string,
  page: number
): Promise<MovieServiceProps> => {
  const url = `${BASE_URL}/search/movie`;

  const { data } = await axios.get<MovieServiceProps>(url, {
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return data;
};
export default fetchMovies;
