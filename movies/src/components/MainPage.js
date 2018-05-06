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
    bestMovies: [],
    message: ''
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
            })
          } else {
            Promise.all(fetchPopularMovies())
              .then(res => {
                this.setState({ movies: res })
              })
          }
        })
    } else {
      Promise.all(fetchPopularMovies())
        .then(res => {
          this.setState({ movies: res })
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
        if (res.Response === "False") {
          Promise.all(fetchPopularMovies())
            .then(res => {
              this.setState({ movies: res })
            })
        } else {
          let pages = []
          let totalPages = Math.floor(+res.totalResults / 10)
          for (let i = 1; i <= totalPages; i++) pages.push(i)
          this.setState({
            movies: res.Search,
            pages,
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
        if (res.Response === "False") {
          this.setState({ message: 'No movies found' })
        }
        else {
          this.setState({ movies: res.Search, message: '' })
        }
      })
  }

  render() {
    const { input, movies, pages, message } = this.state
    const currentPage = +this.props.location.search.split('=')[2]

    const showCurrentPages = () => {
      return pages.map(page => {
        if (currentPage - 4 < page && currentPage + 5 > page) {
          return <Link className='page-number' key={'page' + page} to={`movies?s=${input}?page=${page}`}>{page}</Link>
        }
      })
    }

    return (
      <div className="App">
        <div className='header'>
          <h1>movie<span id='box'>BOX</span> </h1>
          <form onSubmit={this.findMovies}>
            <input onChange={this.saveInput} placeholder='search movies...' autoFocus />
          </form>
        </div>
        <p>{message}</p>
        <div >
          <Movies movies={movies} />
        </div>
        <div className='page-numbers'>
          {showCurrentPages()}
        </div>
      </div>
    );
  }
}

export default MainPage;
