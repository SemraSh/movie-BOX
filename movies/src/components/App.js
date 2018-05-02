import React, { Component } from 'react';
import '../App.css';
import Movies from './Movies'
import { fetchMovies } from '../api/index'

class App extends Component {
  state = {
    input: '',
    movies: [],
    pages: []
  }

  findMovies = (event) => {
    event.preventDefault()
    fetchMovies(this.state.input, 1)
      .then(res => {
        let pages=[]
        let totalMovies = +res.totalResults
        for (let i = 1; i < totalMovies; i+10){
          pages.push(i)
        }
        this.setState({ movies: res.Search, pages})
      })
  }
  saveInput = (event) => {
    this.setState({ input: event.target.value })
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>Find movies...</h1>
          <input onChange={this.saveInput} />
          <button onClick={this.findMovies}></button>
        </div>
        <div>
          <Movies movies={this.state.movies} />
        </div>
        <div className='page-numbers'>
            {this.state.pages.map(page => (
              <p key={'page' + page}>{page}</p>
            ))}
        </div>
      </div>
    );
  }
}

export default App;
