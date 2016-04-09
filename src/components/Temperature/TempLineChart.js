import React, { PropTypes, Component } from 'react';
import http from '../../core/HttpClient.js';
import _ from 'lodash';
import moment from 'moment';

const LineChart = require('react-chartjs').Line;

export default class TempLineChart extends Component {
  static propTypes = {
    temp: PropTypes.number,
  };

  constructor() {
    super();
    this.state = {
      data: [],
      start: moment().subtract(2, 'days'),
      end: moment()
    };
  }

  componentDidMount() {
    http.get('/temp')
      .then(data => this.setState({data}));
  }

  render() {
    if (!this.state.data.length) {
      return <div>Loading...</div>;
    }

    const graphWidth = 1000;

    const formattedData = this.state.data.map(d => ({
      temperature: Math.round(d.temperature * 10) / 10,
      measuredon: moment(d.measuredon, 'YYYYMMDDHH'),
    }));

    const filtered = formattedData.filter(x => x.measuredon.isBetween(this.state.start, this.state.end));

    var chart;
    if (filtered.length) {
      let data = _.sortBy(filtered, d => d.measuredon);
      const longDateFormat = 'ddd D MMM Hu';
      data[0].displayLabel = data[0].measuredon.format(longDateFormat);
      for (let i = 1; i < data.length; i++) {
        if (data[i].measuredon.isSame(data[i - 1].measuredon, 'd')) {
          data[i].displayLabel = data[i].measuredon.format('Hu');
        } else {
          data[i].displayLabel = data[i].measuredon.format(longDateFormat);
        }
      }

      //console.log('data', data);
      const chartData = {
        labels: data.map(d => d.displayLabel),
        datasets: [{
          label: 'My First dataset',
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
        pointHitDetectionRadius: 7,
      };
      chart = <LineChart data={chartData} options={chartOptions} width={graphWidth} height="350"/>;
    }

    return (
      <div style={{margin: 25, width: graphWidth}}>
        {chart}

        <div style={{width: 200, margin: 'auto', textAlign: 'center', color: 'firebrick'}}>
          <i className="fa fa-arrow-left fa-3x" onClick={::this._back} style={{cursor: 'pointer'}}></i>
          <i className="fa fa-arrow-right fa-3x" onClick={::this._forward} style={{cursor: 'pointer', marginLeft: 25}}></i>
        </div>
      </div>
    );
  }

  _back() {
    this.setState({
      start: moment(this.state.start).subtract(2, 'days'),
      end: moment(this.state.end).subtract(2, 'days')
    });
  }
  _forward() {
    this.setState({
      start: moment(this.state.start).add(2, 'days'),
      end: moment(this.state.end).add(2, 'days')
    });
  }
}