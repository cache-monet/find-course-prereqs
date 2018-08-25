import React, { Component } from 'react';
import './App.css';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Course Prerequisites Finder</h1>
        </header>
        <div className="App-Body">
          <Search></Search>
        </div>
      </div>
    );
  }
}

export default App;
