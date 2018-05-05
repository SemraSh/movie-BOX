import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../App.css';
import MainPage from './MainPage';
import Movie from './Movie'


class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
        <Switch>
          <Route exact path='/movie/:id' component={Movie} />
          <Route path='/' component={MainPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
