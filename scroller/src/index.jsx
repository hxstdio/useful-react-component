import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { utils } from './utils';

// 引入tap插件
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const defaultStyles = {
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  width: '100%'
}

/**
 * react 滚动容器组件
 */
class Scroller extends Component {

  static propTypes = {
    /**
     * 滚动方向
     */
    direction: PropTypes.oneOf(['horizontal', 'vertical']),

    /**
     * 是否回弹动画
     */
    bounce: PropTypes.bool,

    /**
     * 缓动动画配置
     */
    easing: PropTypes.object,

    /**
     * 是否加动量，惯性阻尼
     */
    momentum: PropTypes.bool,

    /**
     * 是否在scroller内容变化时重置位置
     */
    resetWhenUpdate: PropTypes.bool,

    /**
     * 外层容器覆盖样式
     */
    style: PropTypes.object
  }

  static defaultProps = {
    direction: 'vertical',
    bounce: true,
    easing: utils.ease.circular,
    momentum: true,
    resetWhenUpdate: false
  }

  constructor(props) {
    super(props);
    this.scrollerStyle = null;
    this.options = props;
    this.useTransform = !utils.isBadAndroid;
    this.initDimensions();
  }

  initDimensions() {
    this.pointX = 0;
    this.pointY = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.translateX = 0;
    this.translateY = 0;
    this.maxOffsetX = 0;
    this.maxOffsetY = 0;
  }

  componentDidMount() {
    this.resetContainer();
    this.scroller.addEventListener('transitionend', this.transitionEnd.bind(this), false);
    this.scroller.addEventListener('webkitTransitionEnd', this.transitionEnd.bind(this), false);
  }

  componentDidUpdate(prevProps, prevState){
    this.props.resetWhenUpdate && this.initDimensions();
    this.resetContainer();
    this.props.resetWhenUpdate && this.resetOffset();
  }

  render() {
    return null;
  }
}

export default Scroller;