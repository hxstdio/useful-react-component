import React, { Component, addons } from 'react';
import PropTypes from 'prop-types';
import Portal from '@urc/portal/src/index.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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
    onTouchTapCb: PropTypes.func
  }

  static defaultProps = {
    isLockScrolling: true,
    isUseAnim: true,
    animDuration: 300,
    zIndex: 9999,
    isUsePortal: false,
    containerClassName: '',
    onTouchTapCb: () => {}
  }

  constructor(props) {
    super(props);
    this.onTouchTapHandle = this.onTouchTapHandle.bind(this);

    this.state = {
      show: false
    }
  }

  componentDidMount() {
    const { show } = this.state;

    if (show) {
      this.applyAutoLockScrolling(show);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { show } = this.state;

    if (show !== nextState.show) {
      this.applyAutoLockScrolling(nextState.show);
    }
  }

  componentWillUnmount() {
    const { show } = this.state;

    if (show) {
      this.allowScrolling();
    }
  }

  applyAutoLockScrolling(show) {
    const { isLockScrolling } = this.props;

    if (isLockScrolling) {
      if (show) {
        this.preventScrolling();
      } else {
        this.allowScrolling();
      }
    }
  }

  preventTouchMoveDefault(e) {
    e.preventDefault();
  }

  /**
   * 设置蒙层组件显示
   */
  show () {
    this.setState({
      show: true
    });
  }

  /**
   * 设置蒙层组件隐藏
   */
  hide () {
    this.setState({
      show: false
    });
  }

  /**
   * 切换蒙层组件显示状态
   */
  toggle () {
    const { show } = this.state;

    this.setState({
      show: !show
    });
  }

  preventScrolling() {
    document.body.addEventListener('touchmove', this.preventTouchMoveDefault, { passive: false });
  }

  allowScrolling() {
    document.body.removeEventListener('touchmove', this.preventTouchMoveDefault, { passive: false });
  }

  /**
   * 点击蒙层时的回调函数
   * @param e
   */
  onTouchTapHandle(e) {
    const { onTouchTapCb } = this.props;
    onTouchTapCb(e);
  }

  render() {
    const { isUseAnim, animDuration, zIndex, isUsePortal, containerClassName } = this.props;
    const { show } = this.state;
    const addStyle = {
      zIndex,
      transitionDuration: `${animDuration / 1000}s`
    };

    const overlay = <div
      onTouchTap={this.onTouchTapHandle}
      style={addStyle}
      className={`overlay ${containerClassName}`}>&nbsp;</div>;

    const overlayWithAnim = isUseAnim ? (
      <ReactCSSTransitionGroup
        transitionName="overlay"
        transitionAppear={true}
        transitionAppearTimeout={animDuration}
        transitionEnterTimeout={animDuration}
        transitionLeaveTimeout={animDuration}>
        { overlay }
      </ReactCSSTransitionGroup>
    ) : overlay;

    const overlayWithPortal = isUsePortal ? (
      <Portal>{ overlayWithAnim }</Portal>
    ) : overlayWithAnim;

    return show ? overlayWithPortal : null;
  }
}

export default Overlay;