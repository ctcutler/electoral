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
const formatVPP = d => numeral(d+1).format('0.00');

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
        type: 'bar',
        labels: {
          //format: (v, id, i, j) => categories[i]
          format: (v, id, i, j) => categories[i] + ' (' + formatVPP(v) + ')'
        },
      },
      padding: {
        left: 250
      },
      tooltip: {
        format: {
          value: formatVPP
        }
      },
      bar: {
        width: {
          ratio: .8
        }
      },
      axis: {
        x: {
          show: false,
          type: 'category',
          tick: {
              rotate: 75,
              multiline: false
          },
          categories,
        },
        y: {
          show: false,
          tick: {
            format: d =>  d+1,
          }
        },
        rotated: true
      },
      legend: {
        show: false
      },
      size: {
        height: 2000,
        width: 800
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
    return <div className="explanation">
      <p>Here's a chart showing the votes/person for all 50 states and DC:</p>
      <div id="vppBarChart"></div>
    </div>;
  }
}
export default VPPBarChart;
