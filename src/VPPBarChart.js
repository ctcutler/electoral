import React, { Component } from 'react';
import R from 'ramda';
import numeral from 'numeral';
import c3 from 'c3';

const vpps = R.compose(
  R.prepend('Votes Per Person'),
  R.map(R.compose(R.add(-1), R.prop('votesPerPerson'))),
);
const stateNames = R.map(R.prop('name'));
const sortedStates = R.compose(
  R.sortBy(R.prop('votesPerPerson')),
  R.values
);

class VPPBarChart extends Component {
  /* Note: in order to make the bars go negative below 1.0, we subtract 1
     from all data points in vpps() and add 1 to values before displaying
     them in tooltips and axis ticks. */
  _renderChart() {
    if (!this.props.states) return;
    const states = sortedStates(this.props.states);
    const columns = [ vpps(states) ];
    const categories = stateNames(states);
    c3.generate({
        bindto: '#vppBarChart',
        data: {
            columns,
            type: 'bar'
        },
        grid: {
            y: {
                lines: [{value: 0}]
            }
        },
        tooltip: {
          format: {
            value: d => numeral(d+1).format('0.00'),
          }
        },
        axis: {
          x: {
              type: 'category',
              tick: {
                  rotate: 75,
                  multiline: false
              },
              categories,
          },
          y: {
            tick: {
              format: d =>  d+1,
            }
          }
        }
    });
  }

  componentDidMount() {
    this._renderChart();
  }

  componentDidUpdate() {
    this._renderChart();
  }

  render() {
    return <div id="vppBarChart"></div>;
  }
}
export default VPPBarChart;
