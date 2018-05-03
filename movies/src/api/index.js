const API_URL = 'http://www.omdbapi.com/?apikey=af844020'

export const fetchMovies = (search, page) => {
  return fetch(`${API_URL}&${search}&${page}`)
  .then(res => res.json())
}

