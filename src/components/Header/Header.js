import React, { Component } from 'react';
import styles from './Header.css';
import withStyles from '../../decorators/withStyles';
import Navigation from '../Navigation';

@withStyles(styles)
class Header extends Component {

  render() {
    return (
      <div className="Header">
        <div className="Header-container">
            <img className="Header-brandImg" src={require('./logo-small.png')} width="38" height="38" alt="React" />
            <span className="Header-brandTxt">Delicious Raspberry Pie</span>
          <Navigation className="Header-nav" />
        </div>
      </div>
    );
  }

}

export default Header;
