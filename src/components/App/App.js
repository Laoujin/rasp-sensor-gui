import React, { PropTypes, Component } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext.js';
import withStyles from '../../decorators/withStyles.js';
import Header from '../Header';
import Footer from '../Footer';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actions.js';
import TempLineChart from '../Temperature/TempLineChart.js';

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
        <Header temp={this.props.temp} />
        <TempLineChart />
        <Footer />
      </div>
    );
  }
}

export default App;