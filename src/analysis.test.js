import { NATIONAL_RATIO, stateRatio, calcPersonVotes, matchingStates }
  from './analysis.js';
import { states } from './states.js';

const STATE_RATIO = 258921;
it('calculates a state ratio correctly', () => {
  expect(stateRatio(states['New Hampshire'])).toBe(STATE_RATIO);
});

it('calculates person vote correctly', () => {
  expect(calcPersonVotes(states['New Hampshire'])).toBe(NATIONAL_RATIO/STATE_RATIO);
});

it('finds states that match', () => {
  expect(matchingStates('hampshire')).toEqual([states['New Hampshire']]);
});

it('finds no non-matching states', () => {
  expect(matchingStates('bork bork')).toEqual([]);
});
