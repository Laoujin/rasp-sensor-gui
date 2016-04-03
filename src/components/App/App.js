import React, { PropTypes, Component } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import Footer from '../Footer';
import CurrentTemperature from '../Temperature/CurrentTemp.js';
import actions from '../../actions/actions';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions';

@connect(state => {
  return {
    temp: state.temp,
    heater: state.heater
  };
}, actionCreators)
@withContext
@withStyles(styles)
class App extends Component {
  static propTypes = {
    temp: PropTypes.any,
    tempUpdate: PropTypes.func.isRequired,
  };

  componentDidMount() {
    socket.on('temp', newTemp => {
      this.props.tempUpdate(newTemp);
    });
  }

  render() {
    //console.log('props', this.props);
    return (
      <div>
        <Header />
        <CurrentTemperature temp={this.props.temp} />
        <Footer />
      </div>
    );
  }
}

export default App;