import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

// 引入tap插件
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './index.scss';

class Loading extends Component {

  static propTypes = {
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
  }

  render() {
    return null;
  }
}

export default Loading;