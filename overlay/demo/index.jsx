import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Overlay from '../src/index.jsx';
import './index.scss';

class Demo extends Component {
  constructor(props){
    super(props);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show() {
    this.overlay.show();
  }

  hide() {
    this.overlay.hide();
  }

  render() {
    return (
      <div className="demo">
        <div className="btn-container">
          <div className="button" onClick={this.show}>显示蒙层</div>
        </div>

        <Overlay
          ref={e => this.overlay = e}
          animDuration={300}
          onTouchTapCb={this.hide}
          isUseAnim
          isUsePortal
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Demo />,
  document.querySelector('#wrapper')
);
