import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Movies from './Movies'
import { fetchMovies } from '../api/index'

class MainPage extends Component {
  state = {
    input: '',
    movies: [],
    pages: []
  }

  findMovies = (event) => {
    const search = 's=' + this.state.input
    fetchMovies(search)
      .then(res => {
        let pages = []
        let totalPages = Math.floor(+res.totalResults / 10)
        for (let i = 1; i <= totalPages; i++) pages.push(i)
        this.setState({ movies: res.Search, pages })
      })
  }
  saveInput = (event) => {
    this.setState({ input: event.target.value })
  }

  componentWillReceiveProps(nextProps) {
    const path = nextProps.location.pathname.split('&')
    const search = path[1]
    const page = path[2]
    fetchMovies(search, page)
      .then(res => {
        this.setState({ movies: res.Search })
      })
  }

  render() {
    const { input, movies, pages } = this.state
    return (
      <div className="App">
        <div>
          <h1>Find movies...</h1>
          <form>
            <input onChange={this.saveInput} />
            <button onClick={this.findMovies}></button>
          </form>
        </div>
        <div>
          <Movies movies={movies} />
        </div>
        <div className='page-numbers'>
          {pages.map(page => (
            <Link
              to={`/movies&s=${input}&page=${page}`}
              className='page-number'
              key={'page' + page}
            >{page}</Link>
          ))}
        </div>
      </div>
    );
  }
}

export default MainPage;
