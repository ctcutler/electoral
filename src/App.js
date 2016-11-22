import React, { Component } from 'react';
import R from 'ramda';
import numeral from 'numeral';
import Autosuggest from 'react-autosuggest';

import './App.css';
import './Autosuggest.css';
import {states} from './states.js';

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
    let popPercent = '–';
    let vpp2 = '–';
    let stateName = '–';
    if (chosen) {
      stateName = chosen.name;
      votesPerPerson = numeral(chosen.votesPerPerson).format('0.00');
      elVotePercent = numeral(chosen.elVotePercent).format('0.00');
      popPercent = numeral(chosen.popPercent).format('0.00');
      vpp2 = numeral(chosen.elVotePercent / chosen.popPercent).format('0.00');
    }

    return (
      <div className="App">
        <div>
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
        <div>
          {stateName} has {elVotePercent}% of the nation's electoral votes{' '}
          and {popPercent}% of its population. {elVotePercent}/{popPercent}{' '}
          = {vpp2} votes per person.
        </div>
      </div>
    );
  }
}

export default App;
