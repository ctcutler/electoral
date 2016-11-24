import React, { Component } from 'react';
import R from 'ramda';
import numeral from 'numeral';
import Autosuggest from 'react-autosuggest';

import './App.css';
import './Autosuggest.css';
import { states, nation } from './states.js';

const nameMatches = pattern =>
  R.compose(R.test(RegExp(pattern, 'i')), R.prop('name'));
const matchingStates = substr =>
  R.filter(nameMatches(substr), R.values(states));
const getSuggestionValue = suggestion => suggestion.name;
const renderSuggestion = suggestion => (
  <span> {suggestion.name} </span>
);
const INITIAL_STATE = 'Wyoming';

class App extends Component {
  constructor() {
    super();
    this.state = {
        suggestions: [],
        value: INITIAL_STATE,
        chosen: matchingStates(INITIAL_STATE)[0]
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: matchingStates(value),
      chosen: null
    });
  };

  onSuggestionSelected = (evt, { suggestion }) => {
    this.setState({ chosen: suggestion });
  };

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  render() {
    const { value, suggestions, chosen } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'State Name',
      value,
      onChange: this.onChange
    };


    let votesPerPerson = '–';
    let elVotePercent = '–';
    let stateName = '–';
    let totalVotes = '–';
    let statePop = '–';
    let stateVotes = '–';
    let elVotes = '–';
    if (chosen) {
      // FIXME: calculate more of this in Python
      const er = chosen.elVotePercent/100;
      const sv = er * nation.votingAgePop;
      const vpp = sv / chosen.votingAgePop;
      stateName = chosen.name;
      totalVotes = numeral(nation.votingAgePop).format('0,0');
      statePop = numeral(chosen.votingAgePop).format('0,0');
      stateVotes = numeral(sv).format('0,0');
      elVotePercent = numeral(chosen.elVotePercent).format('0.00');
      elVotes = numeral(chosen.elVotes).format('0,0');
      votesPerPerson = numeral(vpp).format('0.00');
    }

    return (
      <div>
        <div className="headline">
          Each person in<br/>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          /><br/>
          gets {votesPerPerson} votes for president.
        </div>
        <div className="explanation">
          <p>If the presidential election were decided by a popular vote, every voter would get exactly one vote.  Instead, the <a href="https://en.wikipedia.org/wiki/Electoral_College_(United_States)">electoral college</a> decides the election.  How does it divide up the <span className="number">{totalVotes}</span> available votes?</p>

          <p>{stateName} gets <span className="number">{elVotes}</span> out of <span className="number">538</span> (or about <span className="number">{elVotePercent}%</span>) of the nation's electoral votes. Its voters decide about <span className="number">{elVotePercent}%</span> of the election.</p>

          <p>That means that {stateName} gets about <span className="number">{elVotePercent}%</span> of the <span className="number">{totalVotes}</span> votes available: <span className="number">{stateVotes}</span> votes.</p>

          <p>{stateName} has <span className="number">{statePop}</span> voters.  <span className="number">{stateVotes}</span> state votes / <span className="number">{statePop}</span> state voters = <span className="number">{votesPerPerson}</span> votes per person.</p>

        </div>
        <div className="source">
          <p>Vote counts come from the U.S. Census's 2016 Electorate Profiles data: http://www.census.gov/data/tables/time-series/demo/voting-and-registration/electorate-profiles-2016.html, specifically the "Total of citizens 18 years and older" figures. Source code available <a href="https://github.com/ctcutler/electoral">here</a>.</p>
        </div>
      </div>
    );
  }
}

export default App;
