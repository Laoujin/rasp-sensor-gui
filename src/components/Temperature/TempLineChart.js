import React, { PropTypes, Component } from 'react';
import http from '../../core/HttpClient.js';
import _ from 'lodash';
import moment from 'moment';
import cn from 'classnames';

const LineChart = require('react-chartjs').Line;

const graphWidth = 1000;
const longDateFormat = 'ddd D MMM Hu';
const timeOnlyFormat = 'Hu';

function twoDaysLabels(data, index) {
  if (data[index].measuredon.isSame(data[index - 1].measuredon, 'd')) {
    return data[index].measuredon.format(timeOnlyFormat);
  } else {
    return data[index].measuredon.format(longDateFormat);
  }
}

function weekLabels(data, index) {
  const displayHours = [8, 20];
  if (displayHours.indexOf(data[index].measuredon.hour()) !== -1) {
    return data[index].measuredon.format(longDateFormat);
  }
  return '';
}

const filters = [
  {filterName: '48h', diff: 2, interval: 'days', label: twoDaysLabels},
  {filterName: '7d', diff: 7, interval: 'days', label: weekLabels},
];

function getDefaultState(filter) {
  return {
    start: moment().subtract(filter.diff, filter.interval),
    end: moment(),
    filter: filter
  };
}

export default class TempLineChart extends Component {
  static propTypes = {
    temp: PropTypes.number,
  };

  constructor() {
    super();
    this.state = Object.assign({data: []}, getDefaultState(filters[0]));
  }

  componentDidMount() {
    const self = this;
    http.get('/temp')
      .then(data => self.setState({data}));
  }

  render() {
    if (!this.state.data.length) {
      return <div>Loading...</div>;
    }

    const formattedData = this.state.data.map(d => ({
      temperature: Math.round(d.temperature * 10) / 10,
      measuredon: moment(d.measuredon, 'YYYYMMDDHH'),
    }));

    const filtered = formattedData.filter(x => x.measuredon.isBetween(this.state.start, this.state.end));

    var chart;
    if (filtered.length) {
      let data = _.sortBy(filtered, d => d.measuredon);
      data[0].displayLabel = data[0].measuredon.format(longDateFormat);
      for (let i = 1; i < data.length; i++) {
        data[i].displayLabel = this.state.filter.label(data, i);
      }

      //console.log('data', data);
      const chartData = {
        labels: data.map(d => d.displayLabel),
        datasets: [{
          label: 'Temperaturez',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: data.map(d => d.temperature)
        }]
      };

      const chartOptions = {
        pointHitDetectionRadius: 1,
        onAnimationComplete: () => {
          //console.log('chart', this.refs.canvas.getChart());
          //var canvas = this.refs.canvas.getCanvas().getContext('2d');
          //console.log('wheee', canvas);
        }
      };
      chart = <LineChart ref="canvas" data={chartData} options={chartOptions} width={graphWidth} height="350"/>;
    }

    return (
      <div style={{margin: 25, width: graphWidth}}>
        <div>
          <h2>Filter</h2>
          {filters.map((filter, index) => {
            const classNames = cn('btn btn-sm', 'btn-' + (filter !== this.state.filter ? 'default' : 'primary'));
            return (
              <button key={index} type="button" onClick={this._setFilter.bind(this, filter)} className={classNames} style={{marginRight: 15}}>
                {filter.filterName}
              </button>
            );
          })}
        </div>
        <h2>Chart</h2>
        {chart}

        <div style={{width: 200, margin: 'auto', textAlign: 'center', color: 'firebrick'}}>
          <i className="fa fa-arrow-left fa-3x" onClick={::this._back} style={{cursor: 'pointer'}}></i>
          <i className="fa fa-arrow-right fa-3x" onClick={::this._forward} style={{cursor: 'pointer', marginLeft: 25}}></i>
        </div>
      </div>
    );
  }

  _setFilter(filter) {
    this.setState(getDefaultState(filter));
  }
  _back() {
    this.setState({
      start: moment(this.state.start).add(-this.state.filter.diff, this.state.filter.interval),
      end: moment(this.state.end).add(-this.state.filter.diff, this.state.filter.interval)
    });
  }
  _forward() {
    this.setState({
      start: moment(this.state.start).add(this.state.filter.diff, this.state.filter.interval),
      end: moment(this.state.end).add(this.state.filter.diff, this.state.filter.interval)
    });
  }
}