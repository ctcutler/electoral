import R from 'ramda';

const EIGHTEEN_AND_OVER = 'Total of citizens 18 years and older';
const E_VOTES = 'Electoral votes';
const sumValues = prop => R.compose(R.sum, R.map(R.prop(prop)), R.values);
export const nationalRatio = states =>
  sumValues(EIGHTEEN_AND_OVER)(states) / sumValues(E_VOTES)(states);
export const stateRatio = state => state[EIGHTEEN_AND_OVER] / state[E_VOTES];
export const calcPersonVote = states => state =>
  nationalRatio(states) / stateRatio(state);
export const calcPersonVotes = states =>
  R.map(calcPersonVote(states), states);
