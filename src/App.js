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
const formatVotes = n => n !== null ? numeral(n).format('0.00') : '–';
const INITIAL_STATE = 'Wyoming';

class App extends Component {
  constructor() {
    super();
    this.state = {
        suggestions: [],
        value: INITIAL_STATE,
        personVotes: matchingStates(INITIAL_STATE)[0].votesPerPerson
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: matchingStates(value),
      personVotes: null
    });
  };

  onSuggestionSelected = (evt, { suggestion }) => {
    this.setState({ personVotes: suggestion.votesPerPerson });
  };

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  render() {
    const { value, suggestions, personVotes } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'state name',
      value,
      onChange: this.onChange
    };

    return (
      <div className="App">
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
        get {formatVotes(personVotes)} votes each.
      </div>
    );
  }
}

export default App;
