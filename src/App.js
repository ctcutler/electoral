import React, { Component } from 'react';
import './App.css';
import { states, nation } from './states.js';
import VotesPerPerson from './VotesPerPerson';

class App extends Component {
  render() {
    return (
      <div>
        <VotesPerPerson states={states} nation={nation}/>
      </div>
    );
  }
}

export default App;
