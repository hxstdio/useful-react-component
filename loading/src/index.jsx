import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LOADING  } from './svg.base64.js';

import './index.scss';

class Loading extends Component {

  static propTypes = {
    /**
     * 组件是否展示
     */
    show: PropTypes.bool,

    /**
     * 初始化是否展示 loading， 只在非受控模式生效
     */
    initShow: PropTypes.bool,

    /**
     * 组件的类型
     * fullPage 全页loading
     * part 行内loading
     */
    type: PropTypes.oneOf(['page', 'part']),

    /**
     * 组件的宽度
     */
    width: PropTypes.number,

    /**
     * 组件的高度
     */
    height: PropTypes.number,

    /**
     * 动画的宽度
     */
    aniWidth: PropTypes.number,

    /**
     * 动画的高度
     */
    aniHeight: PropTypes.number,

    /**
     * 蒙层的透明度
     */
    opacity: PropTypes.number,

    /**
     * 全页面背景的蒙层
     */
    mask: PropTypes.bool
  }

  static defaultProps = {
    initShow: false,
    type: 'page',
    width: 20,
    height: 20,
    aniWidth: 75,
    aniHeight: 75,
    opacity: 0.2,
    mask: false
  }

  constructor(props) {
    super(props);

    this.state = {
      show: props.initShow || false
    };
  }

  /**
   * 将px像素转化为rem
   * @param px
   * @returns {string}
   */
  px2rem(px) {
    if (px && !isNaN(px)) {
      return `${(parseInt(px, 10) / 75).toFixed(5)}rem`;
    }
  }

  /**
   * 设置组件展示
   */
  show(){
    this.setState({
      show: true
    });
  }

  /**
   * 设置组件隐藏
   */
  hide() {
    this.setState({
      show: false
    });
  }

  /**
   * 渲染行内loading
   * @returns {XML}
   */
  renderPartLoading() {
    const { width, height } = this.props;
    const style = {
      backgroundImage: `url(${LOADING})`,
      width: this.px2rem(width),
      height: this.px2rem(height)
    };

    return <i style={style} className="svg-part-loading"></i>
  }

  /**
   * 渲染全页loading
   * @returns {*}
   */
  renderPageLoading() {
    const { width, height, aniWidth, aniHeight, opacity, mask } = this.props;
    const style = {
      width: this.px2rem(width),
      height: this.px2rem(height),
      backgroundColor: `rgba(0, 0, 0, ${opacity})`
    };

    const svgStyle = {
      width: this.px2rem(aniWidth),
      height: this.px2rem(aniHeight)
    }

    const pageLoading = <div className="svg-page-loading" style={style}>
      <img className="svg-loading" src={LOADING} style={svgStyle} />
    </div>;

    return mask ? (
      <div className="page-loading-mask">
        { pageLoading }
      </div>
      ) : (
        pageLoading
      )
  }

  render() {
    const { show: propsShow,type } = this.props;
    const { show: stateShow } = this.state;
    const show = typeof propsShow === 'boolean' ? propsShow : stateShow;
    if(!show){
      return null;
    }

    return type === 'part' ? this.renderPartLoading() : this.renderPageLoading();
  }
}

export default Loading;