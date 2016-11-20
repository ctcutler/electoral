import { nationalRatio, stateRatio, calcPersonVote, calcPersonVotes }
  from './analysis.js';

const states = {
  Westeros: {
    'Total of citizens 18 years and older': 6,
    'Electoral votes': 2,
  },
  Panem: {
    'Total of citizens 18 years and older': 24,
    'Electoral votes': 4,
  },
};

it('calculates the national ratio correctly', () => {
  expect(nationalRatio(states)).toBe(5);
});

it('calculates a state ratio correctly', () => {
  expect(stateRatio(states['Panem'])).toBe(6);
});

it('calculates person vote correctly', () => {
  expect(calcPersonVote(states)(states['Panem'])).toBe(5/6);
});

it('calculates all person votes correctly', () => {
  expect(calcPersonVotes(states)).toEqual({
    Westeros: 5/3,
    Panem: 5/6,
  });
});
