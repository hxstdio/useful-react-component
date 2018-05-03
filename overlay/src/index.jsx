import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Portal from '../../portal/src/index';
import './index.scss';

/**
 * 一个通用的蒙层
 * 受控组件，是否展示由show,hide方法控制
 */
class Overlay extends Component {

  static propTypes = {

    /**
     * 是否锁定滚动
     */
    isLockScrolling: PropTypes.bool,

    /**
     * 蒙层弹出时，是否使用动画
     */
    isUseAnim: PropTypes.bool,

    /**
     * 蒙层弹出时的动画时长，单位为毫秒
     */
    animDuration: PropTypes.number,

    /**
     * 蒙层的z-index值
     */
    zIndex: PropTypes.number,

    /**
     * 是否使用Portal组件，传送Overlay到指定DOM层级
     */
    isUsePortal: PropTypes.bool,

    /**
     * 外层容器的样式，用于自定义样式
     */
    containerClassName: PropTypes.string,

    /**
     * 点击蒙层时的回调
     */
    onClickCb: PropTypes.func
  }

  static defaultProps = {
    isLockScrolling: true,
    isUseAnim: true,
    animDuration: 300,
    zIndex: 9999,
    isUsePortal: false,
    containerClassName: '',
    onClickCb: () => {}
  }

  constructor(props) {
    super(props);
  }

  render() {
    return null;
  }
}

export default Overlay;