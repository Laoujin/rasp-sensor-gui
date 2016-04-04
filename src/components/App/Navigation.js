import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

export default class Navigation extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <div className={classNames(this.props.className, 'Navigation')} role="navigation">
      </div>
    );
  }
}