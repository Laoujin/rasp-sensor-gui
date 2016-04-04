import React, { Component, PropTypes } from 'react';
import CurrentTemperature from '../Temperature/CurrentTemp.js';

export default class Header extends Component {
  static propTypes = {
    temp: PropTypes.any.isRequired
  }

  render() {
    return (
      <div style={{height: 47, backgroundColor: '#373277', color: '#fff'}}>
        <div style={{padding: 5, display: 'inline-block'}}>
          <img src={require('./logo-small.png')} width="38" height="38" />
          <strong style={{marginLeft: 20}}>Delicious Raspberry Pie</strong>
        </div>
        <div className="label label-danger" style={{display: 'inline-block', margin: 10, float: 'right', borderRadius: '1em', fontSize: 18}}>
          <CurrentTemperature temp={this.props.temp} />
        </div>
      </div>
    );
  }
}