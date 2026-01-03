import css from '../MovieGrid/MovieGrid.module.css';
import type { Movie } from '../../types/movie';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

function MovieGrid({ movies, onSelect }: MovieGridProps) {
  const IMG_URL = import.meta.env.VITE_API_URL_IMG;
  return (
    <ul className={css.grid}>
      {movies.map((item) => (
        <li key={item.id} onClick={() => onSelect(item)}>
          <div className={css.card}>
            <img
              className={css.image}
              src={IMG_URL + `${item.poster_path}`}
              alt={item.title}
              loading="lazy"
            />
            <h2 className={css.title}>{item.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieGrid;
