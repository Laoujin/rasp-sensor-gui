import React, { PropTypes, Component } from 'react';
import styles from './CurrentTemp.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class CurrentTemp extends Component {
  static propTypes = {
    temp: React.PropTypes.number,
  };

  render() {
    return (
      <div className="CurrentTemp">
        {this.props.temp ? this.props.temp.toFixed(2) : '??'}
      </div>
    );
  }
}

export default CurrentTemp;