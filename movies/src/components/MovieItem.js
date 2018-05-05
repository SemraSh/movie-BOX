import React from 'react';
import { Link } from 'react-router-dom';

const MovieItem = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className='movie-item' style={{ backgroundImage: `url(${movie.Poster})` }}>
        <div className='movie-details'>
          <p>{movie.Type.toUpperCase()}</p>
          <p>{movie.Year}</p>
          <p className='movie-title'>
            {movie.Title.toUpperCase()}</p>
        </div>
      </div>
    </Link>
  )
}

export default MovieItem;