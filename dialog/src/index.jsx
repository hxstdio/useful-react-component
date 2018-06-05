import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Overlay from '@urc/overlay/src/index.jsx';
import Portal from '@urc/portal/src/index.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// 引入tap插件
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './index.scss';

const NOOP = () => {};

/**
 * 简单的对话框
 */
class Dialog extends Component {

  static propTypes = {

    /**
     * 对话框的标题
     */
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),

    /**
     * 对话框的内容
     */
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),

    /**
     * 底部元素
     */
    footer: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),

    /**
     * 主按钮
     */
    primaryBtn: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),

    /**
     * 次按钮
     */
    secondaryBtn: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),

    /**
     * 是否展示
     * 传了show的时候，为受控模式
     * 不传的时候，为非受控模式
     */
    show: PropTypes.bool,

    /**
     * 点击按钮关闭dialog， 仅用于非受控模型
     */
    btnAutoClose: PropTypes.bool,

    /**
     * 点击浮层的时候关闭dialog，仅用于非受控模型
     */
    overlayAutoClose: PropTypes.bool,

    /**
     * 是否使用动画来展示dialog
     */
    useAnim: PropTypes.bool,

    /**
     * 动画的时长
     */
    animDuration: PropTypes.number,

    /**
     * 是否使用传送门
     */
    portal: PropTypes.bool,

    /**
     * 是否使用overlay来包装一下dialog
     */
    overlay: PropTypes.bool,

    /**
     * 外层wrap的形式，可用于自定义
     */
    className: PropTypes.string,

    /**
     * 就是z-index咯
     */
    zIndex: PropTypes.number,

    /**
     * 点击主按钮时的回调
     */
    onPrimaryTouchTap: PropTypes.func,

    /**
     * 点击次按钮时候的回调
     */
    onSecondaryTouchTap: PropTypes.func,

    /**
     * 点击浮层时的回调
     */
    onOverlayTouchTap: PropTypes.func
  }

  static defaultProps = {
    primaryBtn: '确定',
    title: '',
    content: '',
    footer: '',
    btnAutoClose: true,
    overlayAutoClose: false,
    useAnim: true,
    animDuration: 200,
    zIndex: 9999,
    portal: true,
    overlay: true,
    className: '',
    onPrimaryTouchTap: NOOP,
    onSecondaryTouchTap: NOOP,
    onOverlayTouchTap: NOOP
  }

  constructor(props) {
    super(props);

    this.state = {
      show: false
    }
  }

  show() {
    this.setState({
      show: true
    });
  }

  hide() {
    this.setState({
      show: false
    });
  }

  primaryTouchTapHandler(e) {
    const {
      show,
      btnAutoClose,
      onPrimaryTouchTap
    } = this.props;

    onPrimaryTouchTap(e);

    if (typeof show !== 'boolean' && btnAutoClose) {
      this.setState({
        show: false
      });
    }
  }

  secondaryTouchTapHandler(e) {
    const {
      show,
      btnAutoClose,
      onSecondaryTouchTap
    } = this.props;

    onSecondaryTouchTap();

    if (typeof show !== 'boolean' && btnAutoClose) {
      this.setState({
        show: false
      });
    }
  }

  overlayTouchTapHandler(e) {
    const {
      show,
      overlayAutoClose,
      onOverlayTouchTap
    } = this.props;

    onOverlayTouchTap();

    if(typeof show !== 'boolean' && overlayAutoClose) {
      this.setState({
        show: false
      });
    }
  }

  render() {
    const {
      show: propsShow,
      title,
      content,
      footer,
      primaryBtn,
      secondaryBtn,
      useAnim,
      animDuration,
      zIndex,
      portal,
      overlay,
      className,
    } = this.props;

    const {show: stateShow} = this.state;
    const show = typeof propsShow === 'boolean' ? propsShow : stateShow;

    const dialogContent = show ? (
        <div className="m-pop-tips" style={{transitionDuration: `${animDuration / 1000}s`}}>
          <div className="m-pop-content">
            {
              title ? <div className="m-pop-title">{title}</div> : null
            }
            {
              content ? <div className="m-pop-value">{content}</div> : null
            }
          </div>
          <div className="m-pop-footer">{footer}</div>
          <div className="m-pop-btn">
            {
              secondaryBtn && (
                <div
                  className="m-btn-cancel"
                  onTouchTap={this.secondaryTouchTapHandler}
                >
                  {secondaryBtn}
                </div>
              )
            }
            <div
              className="m-btn-confirm"
              onTouchTap={this.primaryTouchTapHandler}
            >
              {primaryBtn}
            </div>
          </div>
        </div>
      ) : null;

    const overlayComponent = overlay ? (
        <Overlay
          onTouchTapCb={this.overlayTouchTapHandler}
          isUseAnim={useAnim}
          animDuration={animDuration}
          show={show}/>
      ) : null;

    const wrap = (
      <div
        className={`m-dialog ${className}`}
        style={{zIndex}}
      >
        {
          useAnim ? (
              <ReactCSSTransitionGroup
                transitionName="dialog"
                transitionAppear={true}
                transitionAppearTimeout={animDuration}
                transitionEnterTimeout={animDuration}
                transitionLeaveTimeout={animDuration}>
                {dialogContent}
                {overlayComponent}
              </ReactCSSTransitionGroup>
            ) : (
              <div>
                {dialogContent}
                {overlayComponent}
              </div>
            )
        }
      </div>
    );

    return portal ? (
      <Portal>
        {wrap}
      </Portal>
    ) : (
      wrap
    );
  }
}

export default Dialog;