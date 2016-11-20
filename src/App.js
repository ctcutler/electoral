import React, { Component } from 'react';
import './App.css';
import { states } from './states.js';
import { calcPersonVotes } from './analysis.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
        selected: 'Wyoming',
        personVotes: calcPersonVotes(states)
    };
  }

  render() {
    return (
      <div className="App">
        <p>People in {this.state.selected} get {this.state.personVotes[this.state.selected]} votes each.</p>
      </div>
    );
  }
}

export default App;
