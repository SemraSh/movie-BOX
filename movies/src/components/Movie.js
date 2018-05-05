import React, { Component } from 'react';
import { fetchSingleMovie } from '../api'

class Movie extends Component {
  state = {
    movie: {}
  }
  componentDidMount() {
    const movieId = this.props.location.pathname.split('/')[2]
    fetchSingleMovie(movieId)
    .then(res => {
      console.log(res)
      this.setState({
        movie: res
      })
    }
    )
  }
  render() {
    const {movie} = this.state
    return (
      <div className ='movie'>
      <div>
      <img alt='poster' src={movie.Poster==='N/A' ? '/broken-image.jpg': movie.Poster}/>
      </div>
      <div className='movie-data'>
        <h2>{movie.Title && movie.Title.toUpperCase()}</h2>
        <p><span className='emph'>Release date:</span> {movie.Released}</p>
        <p>{movie.Runtime}</p>
        <p><span className='emph'>Actors: </span>Actors: {movie.Actors}</p>
        <p><span className='emph'>Director: </span>{movie.Director}</p>
        <p><span className='emph'>Awards:</span> {movie.Awards}</p>
        <br/>
        <p>{movie.Plot}</p>
        <br/>
        <p><span className='emph'>Production by </span>{movie.Production}</p>
        <p><span className='emph'>imdb rating:</span> {movie.imdbRating} voted by {movie.imdbVotes} people</p>
      </div>
      </div>
    )
  }
}

export default Movie;