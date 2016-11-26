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
        <div className="source">
          <p>Vote counts come from the U.S. Census's 2016 Electorate Profiles data: <a href="http://www.census.gov/data/tables/time-series/demo/voting-and-registration/electorate-profiles-2016.html">http://www.census.gov/data/tables/time-series/demo/voting-and-registration/electorate-profiles-2016.html</a>, specifically the "Total of citizens 18 years and older" figures. Source code available <a href="https://github.com/ctcutler/electoral">here</a>.</p>
        </div>
      </div>
    );
  }
}

export default App;
