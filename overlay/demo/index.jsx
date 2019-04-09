import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Overlay from '../src/index.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './index.scss';

class Demo extends Component {
  constructor(props){
    super(props);
    this.showControlledComponent = this.showControlledComponent.bind(this);
    this.showUnControlledComponent = this.showUnControlledComponent.bind(this);
    this.hide = this.hide.bind(this);

    this.state = {
      show: false
    }
  }

  showUnControlledComponent() {
    this.uncontrolledOverlay.show();
  }

  showControlledComponent() {
    this.setState({
      show: true
    });
  }

  hide() {
    this.setState({
      show: false
    });
  }

  render() {
    const { show } = this.state;

    return (
      <div className="demo">
        <div className="btn-container">
          <div className="button" onClick={this.showControlledComponent}>显示蒙层(受控模式)</div>
          <div className="button" onClick={this.showUnControlledComponent}>显示蒙层(非受控模式)</div>
        </div>

        <Overlay
          containerClassName="controlled-overlay"
          show={show}
          onTouchTapCb={this.hide}
        />

        <Overlay
          containerClassName="uncontrolled-overlay"
          ref={e => this.uncontrolledOverlay = e}
          isAutoClose
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.querySelector('#wrapper')
);
