import React, { PropTypes, Component } from 'react';
import http from '../../core/HttpClient.js';
import _ from 'lodash';
import moment from 'moment';

const LineChart = require('react-chartjs').Line;

export default class TempLineChart extends Component {
  static propTypes = {
    temp: React.PropTypes.number,
  };

  constructor() {
    super();
    this.state = {
      data: []
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

    const formattedData = this.state.data.map(d => ({
      temperature: Math.round(d.temperature * 10) / 10,
      measuredon: moment(d.measuredon, 'YYYYMMDDHH'),
    }));
    var data = _.sortBy(formattedData, d => d.measuredon);

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
    var chartData = {
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

    const chartOptions = {};

    return (
      <div style={{margin: 25}}>
        <LineChart data={chartData} options={chartOptions} width="1000" height="350"/>
      </div>
    );
  }
}