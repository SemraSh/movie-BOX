import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Movies from './Movies'
import { fetchMovies, fetchPopularMovies } from '../api/index'

class MainPage extends Component {
  state = {
    input: '',
    movies: [],
    pages: [],
    message: '',
    bestMovies:[]
  }

  componentDidMount() {
    if (this.props.location.search) {
      const path = this.props.location.search.split('?')
      const search = path[1]
      const page = path[2]
      fetchMovies(search, page)
        .then(res => {
          if (res.Response === 'True') {
            let pages = []
            let totalPages = Math.floor(+res.totalResults / 10)
            for (let i = 1; i <= totalPages; i++) pages.push(i)
            this.setState({
              movies: res.Search,
              pages,
              message: res.totalResults + ' results found'
            })
          } else {
            Promise.all(fetchPopularMovies())
            .then(res => {
              this.setState({movies: res, message: 'No results found'})
            })
          }
        })
    } else {
      Promise.all(fetchPopularMovies())
        .then(res => {
          this.setState({movies: res})
        })
    }

  }

  findMovies = (event) => {
    event.preventDefault()
    this.props.history.push(`/movies?s=${this.state.input}?page=1`)
    const path = this.props.history.location.search.split('?')
    const search = path[1]
    const page = path[2]
    fetchMovies(search, page)
      .then(res => {
        if(res.Response === "False") {
          Promise.all(fetchPopularMovies())
          .then(res => {
            this.setState({movies: res, message: 'No results found'})
          })
        } else {
          let pages = []
          let totalPages = Math.floor(+res.totalResults / 10)
          for (let i = 1; i <= totalPages; i++) pages.push(i)
          this.setState({
            movies: res.Search,
            pages,
            message: res.totalResults?  `${res.totalResults} results found` : `no results`
          })
        }
      })
  }
  saveInput = (event) => {
    this.setState({ input: event.target.value })
  }

  componentWillReceiveProps(nextProps) {
    const path = nextProps.location.search.split('?')
    const search = path[1]
    const page = path[2]
    fetchMovies(search, page)
      .then(res => {
        this.setState({ movies: res.Search })
      })
  }

  render() {
    const { input, movies, pages, message } = this.state
    return (
      <div className="App">
        <div>
          <h1>Find movies...</h1>
          <form onSubmit={this.findMovies}>
            <input onChange={this.saveInput} />
            <button type='submit'>Search</button>
          </form>
          <h4>{message}</h4>
        </div>
        <div >
          <Movies movies={movies} />
        </div>
        <div className='page-numbers'>
          {pages.map(page => (
            <Link
              to={`movies?s=${input}?page=${page}`}
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
