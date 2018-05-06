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
        {movie.Poster && 
      <img alt='poster' src={movie.Poster==='N/A' ? '/broken-image.jpg': movie.Poster}/>
        }
      </div>
      <div className='movie-data'>
        <h2>{movie.Title && movie.Title.toUpperCase()}</h2>
        {movie.Released !== 'N/A' && <p><span className='emph'>Release date:</span> {movie.Released}</p>}
        {movie.Runtime !== 'N/A' &&<p>{movie.Runtime}</p>}
        {movie.Actors !== 'N/A' && <p><span className='emph'>Actors: </span>Actors: {movie.Actors}</p>}
        {movie.Director !== 'N/A' &&<p><span className='emph'>Director: </span>{movie.Director}</p>}
        {movie.Awards !== 'N/A' &&<p><span className='emph'>Awards:</span> {movie.Awards}</p>}
        <br/>
        {movie.Plot !== 'N/A' &&<p>{movie.Plot}</p>}
        <br/>
        {movie.Production !== 'N/A' &&<p><span className='emph'>Production by </span>{movie.Production}</p>}
        {movie.imdbRating !=='N/A' && <p><span className='emph'>imdb rating:</span>{movie.imdbRating} voted by {movie.imdbVotes} people</p>}
      </div>
      </div>
    )
  }
}

export default Movie;