import React, { Component } from 'react';
import './App.css';
import { states } from './states.js';
import R from 'ramda';

class App extends Component {
  constructor() {
    super();
    this.state = {
        selected: 'California',
        personVotes: this.calcPersonVotes(states)
    };
  }

  calcPersonVotes = R.map(R.prop('Total of citizens 18 years and older'));

  render() {
    return (
      <div className="App">
        <p>People in {this.state.selected} get {this.state.personVotes[this.state.selected]} votes each.</p>
      </div>
    );
  }
}

export default App;
