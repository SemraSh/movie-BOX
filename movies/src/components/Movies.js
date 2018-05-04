import React from 'react';
import MovieItem from './MovieItem';

const Movies = ({movies}) => {
  const renderMovies = () => {
    if(movies) {
      return movies.map(movie => {
        return <MovieItem key={movie.imdbID} movie={movie}/>
      })
    }
    else return null
  }
  return (
    <div className='movies'>
      {renderMovies()}
    </div>
  )
}
export default Movies;