import React, { Component, PropTypes } from 'react';
import Navigation from './Navigation.js';
import CurrentTemperature from '../Temperature/CurrentTemp.js';

export default class Header extends Component {
  static propTypes = {
    temp: PropTypes.any.isRequired
  }

  render() {
    return (
      <div className="Header">
        <img className="Header-brandImg" src={require('./logo-small.png')} width="38" height="38" alt="React" />
        <span className="Header-brandTxt">Delicious Raspberry Pie</span>
        <Navigation className="Header-nav" />
        <div className="label label-danger" style={{display: 'inline-block', margin: 10, float: 'right', borderRadius: '1em', fontSize: 18}}>
          <CurrentTemperature temp={this.props.temp} />
        </div>
      </div>
    );
  }
}