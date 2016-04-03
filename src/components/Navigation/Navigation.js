import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './Navigation.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class Navigation extends Component {

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

export default Navigation;
