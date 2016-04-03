import React, { PropTypes, Component } from 'react';

export default class CurrentTemp extends Component {
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