import React from 'react';
import { Link } from 'react-router-dom';

const Movie = ({ movie }) => {
  console.log(movie)
  return (
    <div className='movie' style={{ backgroundImage: `url(${movie.Poster})` }}>
      <div className='movie-details'>
        <p>{movie.Type}</p>
        <p>{movie.Year}</p>
        <Link to={`/movies/movie/${movie.imdbID}`} className='movie-title'>
          {movie.Title.toUpperCase()}</Link>
      </div>
    </div>
  )
}

export default Movie;