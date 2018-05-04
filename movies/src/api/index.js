const API_URL = 'http://www.omdbapi.com/?apikey=af844020'

export const fetchMovies = (search, page) => {
  return fetch(`${API_URL}&${search}&${page}`)
    .then(res => res.json())
}

export const fetchSingleMovie = (movieId) => {
  return fetch(`${API_URL}&i=${movieId}`)
    .then(res => res.json())
}

export const fetchPopularMovies = () => {
  const bestMovies = [
    'tt3896198', 'tt0137523', 'tt1133985', 'tt0211915', 'tt0338013', 'tt0110912', 'tt0109830', 'tt0172495', 'tt2278388', 'tt1707386'
  ]
  const best = []
  return bestMovies.map(movie => {
    return fetch(`${API_URL}&i=${movie}`)
      .then(res => res.json())
  })
}

