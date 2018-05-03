import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../App.css';
import MainPage from './MainPage';
import Movies from './Movies';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Route path='/' component={MainPage} />
        </Router>
      </div>
    );
  }
}

export default App;
