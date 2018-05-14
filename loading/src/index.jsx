import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

// 引入tap插件
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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
    type: 'fullPage',
    width: 0,
    height: 0,
    aniWidth: 0,
    aniHeight: 0,
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



  render() {
    return null;
  }
}

export default Loading;