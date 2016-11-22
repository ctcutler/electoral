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
      placeholder: 'state name',
      value,
      onChange: this.onChange
    };


    let votesPerPerson = '–';
    let elVotePercent = '–';
    let stateName = '–';
    let totalVotes = '–';
    let statePop = '–';
    let stateVotes = '–';
    let elVoteRatio = '–';
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
      elVoteRatio = numeral(er).format('0.0000');
      votesPerPerson = numeral(vpp).format('0.00');
    }

    return (
      <div>
        <div className="headline">
          People in
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          get {votesPerPerson} votes each.
        </div>
        <div className="explanation">
          <p>
            In the U.S. there are {totalVotes} people of voting age so{' '}
            there are that many votes available.
          </p>
          <p>
            {stateName}{' '}
            gets {stateVotes} of those votes because it has {elVotePercent}%{' '}
            of the electoral votes and {elVoteRatio} x {totalVotes} is{' '}
            {stateVotes}.
          </p>
          <p>
            {stateName} has {statePop} residents of voting{' '}
            age so each one of them gets {stateVotes}/{statePop}{' '}
            or {votesPerPerson} votes.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
