import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import fetchMovies from '../../services/movieService';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import type { Movie } from '../../types/movie';
import type { MovieServiceProps } from '../../services/movieService';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import css from '../App/App.module.css';
import ReactPaginate from 'react-paginate';

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const { data, error, isLoading, isError, isSuccess } =
    useQuery<MovieServiceProps>({
      queryKey: ['movies', query, page],
      queryFn: () => fetchMovies(query, page),
      enabled: query !== '',
      placeholderData: keepPreviousData,
    });

  useEffect(() => {
    if (isSuccess && data.results.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [data, isSuccess]);
  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };
  const openModal = (movie: Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isSuccess && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {data?.results.length ? (
        <MovieGrid movies={data.results} onSelect={openModal} />
      ) : null}
      <Toaster position="top-center" reverseOrder={false} />
      {isLoading ? <Loader /> : null}
      {isError ? <ErrorMessage message={error?.message} /> : null}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </>
  );
}

export default App;
