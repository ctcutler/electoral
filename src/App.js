import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';
import injectTapEventPlugin from 'react-tap-event-plugin';

import numeral from 'numeral';
import React, { Component } from 'react';

import './App.css';
import { states } from './states.js';
import { calcPersonVotes } from './analysis.js';


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  constructor() {
    super();

    this.state = {
        selected: 'Wyoming',
        personVotes: calcPersonVotes(states)
    };
  }

  getPersonVotes(stateName) {
    const n = this.state.personVotes[stateName];
    return numeral(n).format('0.00');
  }

  handleSelection(chosen, index) {
    if (chosen in this.state.personVotes) {
      this.setState({selected: chosen});
    }
  }

  render() {
    const style = {
      fontFamily: 'EBGaramond, serif',
      fontSize: '72px',
    };
    return (
      <MuiThemeProvider>
        <div>
        <div className="App">
          People in&nbsp;
          <AutoComplete id='ac'
            className='autoComplete'
            menuStyle={style}
            onNewRequest={chosen => this.handleSelection(chosen)}
            filter={AutoComplete.caseInsensitiveFilter}
            dataSource={Object.keys(this.state.personVotes)}/>
          &nbsp;get {this.getPersonVotes(this.state.selected)} votes each.
        </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
