// import { createPortal } from 'react-dom';

import { useEffect } from 'react';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';
import { createPortal } from 'react-dom';
interface MovieModalProps {
  onClose: () => void;
  movie: Movie;
}

function MovieModal({ onClose, movie }: MovieModalProps) {
  const IMG_URL = import.meta.env.VITE_API_URL_IMG;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={IMG_URL + `${movie.backdrop_path}`}
          alt={`${movie.title}`}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{`${movie.title}`}</h2>
          <p>{`${movie.overview}`}</p>
          <p>
            <strong>Release Date:</strong> {`${movie.release_date}`}
          </p>
          <p>
            <strong>Rating:</strong> {`${movie.vote_average}`}
          </p>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLDivElement
  );
}

export default MovieModal;
