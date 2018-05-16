import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Loading from '../src/index.jsx';
import './index.scss';

export default class PageDemo extends Component {
  constructor(props){
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
    this.state = {
      show: false
    }
  }

  onBtnClick() {
    this.setState({
      show: true
    });
  }

  render() {
    const { show } = this.state;

    return <section>
      <div className="show-btn" onClick={this.onBtnClick}>显示Loading</div>
      <Loading
        show={show}
        width={175}
        height={175}
        aniWidth={75}
        aniHeight={75}
        opacity={0.2}
      />
    </section>
  }

}
