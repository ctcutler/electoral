import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// mock c3 because its use of the SVG DOM exceeds what jest's jsdom can handle
jest.mock('c3');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
