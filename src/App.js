import React, { Component } from 'react';
import numeral from 'numeral';
import Autosuggest from 'react-autosuggest';

import './App.css';
import './Autosuggest.css';
import { states } from './states.js';
import { calcPersonVotes } from './analysis.js';

// FIXME: consider moving this to analysis
const personVotes = calcPersonVotes(states);

const getSuggestions = value => {
  // FIXME: implement something in analysis to do this
  return ['foo', 'bar', 'baz'];
};

// FIXME: consider adding 'name' to state objects and passing full objects around
const getSuggestionValue = suggestion => suggestion;
const renderSuggestion = suggestion => (
  <span> {suggestion} </span>
);

class App extends Component {
  constructor() {
    super();
    this.state = {
        suggestions: [],
        value: ''
    };
  }

  personVotes(stateName) {
    const n = personVotes[stateName];
    return numeral(n).format('0.00');
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ suggestions: getSuggestions(value) });
  };

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  render() {
    const { value, suggestions } = this.state;

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
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        get NNN votes each.
      </div>
    );
  }
}

export default App;
