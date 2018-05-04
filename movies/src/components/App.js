import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../App.css';
import MainPage from './MainPage';
// import Movie from './Movie'


class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route path='/' component={MainPage} />
          {/* <Route exact path='/movies/movie/movieId' component={Movie} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
