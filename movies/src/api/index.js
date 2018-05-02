const API_URL = 'http://www.omdbapi.com/?apikey=42894f05'

export const fetchMovies = (input, page) => {
  return fetch(`${API_URL}&s=${input}&page=${page}`)
  .then(res => res.json())
}

