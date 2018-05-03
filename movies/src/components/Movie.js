import React from 'react';

const Movie = ({ movie }) => {
  const handleError = (event) => {
    console.log(event)
  }
  return (
    <div className='movie'>
      <p>{movie.Title}</p>
      <p>{movie.Year}</p>
      <img 
      onError={this.handleError}
      src={movie.Poster}
        alt='poster'
        width='200px'
         />
    </div>
  )
}

export default Movie;