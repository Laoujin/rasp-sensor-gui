import React, { PropTypes, Component } from 'react';
import styles from './Footer.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';

@withViewport
@withStyles(styles)
class Footer extends Component {

  static propTypes = {
    viewport: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  };

  render() {
    // This is just an example how one can render CSS
    const { width, height } = this.props.viewport;
    //this.renderCss(`.Footer-viewport:after {content:' ${width}x${height}';}`);

    return (
      <div className="Footer">
        <div className="Footer-container">
        </div>
      </div>
    );
  }

}

export default Footer;
