import React, { Component } from 'react';
import Loading from '../src/index.jsx';
import './index.scss';

export default class PageDemo extends Component {
  constructor(props){
    super(props);
    this.onPageBtnClick = this.onPageBtnClick.bind(this);
    this.onPartBtnClick = this.onPartBtnClick.bind(this);

    this.state = {
      pageLoadingShow: false,
      partLoadingShow: false
    }
  }

  onPageBtnClick() {
    const { pageLoadingShow } = this.state;
    this.setState({
      pageLoadingShow: !pageLoadingShow
    });
  }

  onPartBtnClick() {
    const { partLoadingShow } = this.state;
    this.setState({
      partLoadingShow: !partLoadingShow
    });
  }

  render() {
    const { pageLoadingShow, partLoadingShow } = this.state;

    return <section>
      <div className="show-btn" onClick={this.onPageBtnClick}>显示全页Loading</div>
      <div className="show-btn" onClick={this.onPartBtnClick}>显示行内Loading</div>
      <Loading
        show={partLoadingShow}
        type="part"
      />
      <Loading
        show={pageLoadingShow}
        width={175}
        height={175}
        aniWidth={75}
        aniHeight={75}
        opacity={0.2}
      />
    </section>
  }

}
