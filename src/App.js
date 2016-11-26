import React, { Component } from 'react';
import './App.css';
import { states, nation } from './states.js';
import VotesPerPerson from './VotesPerPerson';
import VPPBarChart from './VPPBarChart';

class App extends Component {
  render() {
    return (
      <div>
        <VotesPerPerson states={states} nation={nation}/>
        <VPPBarChart states={states} nation={nation}/>
      </div>
    );
  }
}

export default App;
