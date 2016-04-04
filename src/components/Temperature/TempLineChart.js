import React, { PropTypes, Component } from 'react';
import http from '../../core/HttpClient.js';

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
    //measuredon=2016010620 & temperature


    return (
      <div>
        <pre>{JSON.stringify(this.state.data)}</pre>
      </div>
    );
  }
}