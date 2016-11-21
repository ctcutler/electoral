import R from 'ramda';
import { states } from './states.js';

// FIXME: this is silly. . . all analysis should happen during import
// and the react app should just look up values
const EIGHTEEN_AND_OVER = 'Total of citizens 18 years and older';
const E_VOTES = 'Electoral votes';
const sumValues = prop => R.compose(R.sum, R.map(R.prop(prop)), R.values);
export const NATIONAL_RATIO =
  sumValues(EIGHTEEN_AND_OVER)(states) / sumValues(E_VOTES)(states);
export const stateRatio = state => state[EIGHTEEN_AND_OVER] / state[E_VOTES];
export const calcPersonVotes = state => NATIONAL_RATIO / stateRatio(state);

const nameMatches = pattern =>
  R.compose(R.test(RegExp(pattern, 'i')), R.prop('name'));
export const matchingStates = substr =>
  R.filter(nameMatches(substr), R.values(states));
