import React from 'react';

const Movie = ({ movie }) => {
  console.log(movie.Poster)
  return (
    <div className='movie'>
      <p>{movie.Title}</p>
      <p>{movie.Year}</p>
      <img src={movie.Poster} alt='poster' height='50px' width='auto' />
    </div>
  )
}

export default Movie;