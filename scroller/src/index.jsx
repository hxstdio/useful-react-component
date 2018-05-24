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

  resetOffset(x = 0, y = 0) {
    const { scrollerHeight } = this.refs.scroller;

    let finallTranslateY = y;
    if (this.props.direction === 'vertical') {
      const safeHeight = 45;
      if (y < this.wrapperHeight - scrollerHeight) {
        finallTranslateY = this.wrapperHeight - scrollerHeight;
      } else if (y >= -this.wrapperHeight + safeHeight) {
        finallTranslateY = 0;
      } else {
        finallTranslateY = y + safeHeight;
      }
    }

    this.scrollTo(x, finallTranslateY, 0);
    this.translateX = x;
    this.translateY = finallTranslateY;
  }

  resetContainer() {
    const { scroller, wrapper } = this.refs;
    const { clientHeight, clientWidth } = wrapper;
    const { scrollHeight, scrollWidth } = scroller;

    this.scroller = scroller;
    this.scrollerStyle = scroller.style;

    this.wrapperHeight = clientHeight;
    this.wrapperWidth = clientWidth;
    this.maxOffsetY = Math.min(clientHeight - scrollHeight, 0);
    this.maxOffsetX = Math.min(clientWidth - scrollWidth, 0);
  }

  start(event) {
    const point = event.touches[0];
    this.pointX = point.pageX;
    this.pointY = point.pageY;
    this.distX = 0;
    this.distY = 0;
    this.momentumStartX = this.translateX;
    this.momentumStartY = this.translateY;
    this.startTime = Date.now();
    this.endTime = 0;
    this.directionLock = 0;
    this.moved = false;
  }

  move(event) {
    const point = event.touches[0];
    const direction = this.options.direction;
    let deltaX = point.pageX - this.pointX;
    let deltaY = point.pageY - this.pointY;
    const timeStamp = Date.now();

    this.pointX = point.pageX;
    this.pointY = point.pageY;

    this.distX += deltaX;
    this.distY += deltaY;

    const absDistX = Math.abs(this.distX);
    const absDistY = Math.abs(this.distY);

    if (timeStamp - this.endTime > 300 && ( absDistX < 10 && absDistY < 10 )) {
      return;
    }

    if (!this.directionLock) {
      if (absDistX > absDistY) {
        this.directionLock = 'v';
      } else {
        this.directionLock = 'h';
      }
    }

    if (this.directionLock === 'v') {
      if (direction === 'horizontal') {
        event.preventDefault();
      } else {
        return;
      }

      deltaY = 0;

    } else if (this.directionLock === 'h') {
      if (direction === 'vertical') {
        event.preventDefault();
      } else {
        return;
      }

      deltaX = 0;
    }

    deltaX = direction === 'vertical' ? 0 : deltaX;
    deltaY = direction === 'horizontal' ? 0 : deltaY;

    this.moveX = this.translateX + deltaX;
    this.moveY = this.translateY + deltaY;

    if (this.moveX > 0 || this.moveX < this.maxOffsetX) {
      this.moveX = this.options.bounce ? this.translateX + deltaX / 3 : this.moveX > 0 ? 0 : this.maxOffsetX;
    }

    if (this.moveY > 0 || this.moveY < this.maxOffsetY) {
      this.moveY = this.options.bounce ? this.translateY + deltaY / 3 : this.moveY > 0 ? 0 : this.maxOffsetY;
    }

    this.moved = true;

    this._translate(this.moveX, this.moveY);

    if (timeStamp - this.startTime > 300) {
      this.startTime = timeStamp;
      this.momentumStartX = this.moveX;
      this.momentumStartY = this.moveY;
    }
  }

  end(event) {
    let moveX = this.moveX;
    let moveY = this.moveY;
    const duration = Date.now() - this.startTime;
    const bounce = this.options.bounce;
    let time;
    let easing;
    let momentumX = { destination: moveX, duration: 0 };
    let momentumY = { destination: moveY, duration: 0 };
    this.endTime = Date.now();

    if (this.isOutOfBounds(moveX, moveY)) {
      this.handleOutOfBounds(moveX, moveY);
      return;
    }

    if (!this.moved) {
      return;
    }

    if (this.options.momentum && duration < 300) {
      if (this.options.direction === 'vertical') {
        momentumY = this.momentum(moveY, this.momentumStartY, duration, this.maxOffsetY, bounce ? this.wrapperHeight : 0, this.options.deceleration);
      }

      if (this.options.direction === 'horizontal') {
        momentumX = this.momentum(moveX, this.momentumStartX, duration, this.maxOffsetX, bounce ? this.wrapperWidth : 0, this.options.deceleration);
      }

      moveX = momentumX.destination;
      moveY = momentumY.destination;
      time = Math.max(momentumX.duration, momentumY.duration);
    }

    if (moveX != this.moveX || moveY != this.moveY) {
      if (this.isOutOfBounds(moveX, moveY)) {
        easing = utils.ease.quadratic;
      }

      this.scrollTo(moveX, moveY, time, easing);
    }

    this.translateX = moveX;
    this.translateY = moveY;
  }

  transitionEnd(event) {
    if (this.isOutOfBounds(this.translateX, this.translateY)) {
      this.handleOutOfBounds(this.translateX, this.translateY);
    }
  }

  momentum(current, start, time, lowerMargin, wrapperSize, deceleration = 0.001) {
    let distance = current - start;
    let speed = Math.abs(distance) / time;
    let destination;
    let duration;

    destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1: 1);
    duration = speed / deceleration;

    if (destination < lowerMargin) {
      destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
      distance = Math.abs(destination - current);
      duration = distance / speed;
    } else if (destination > 0) {
      destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
      distance = Math.abs(current) + destination;
      duration = distance / speed;
    }

    return {
      destination: Math.round(destination),
      duration
    };
  }

  _translate(x, y) {
    const {
      transform,
      transitionTimingFunction,
      transitionDuration
    } = utils.style;

    this.scrollerStyle[transitionTimingFunction] = 'ease';
    this.scrollerStyle[transitionDuration] = '0ms';
    this.scrollerStyle[transform] = `translate3d(${x}px, ${y}px, 0)`;
    this.translateX = x;
    this.translateY = y;
  }

  scrollTo(newX, newY, time = 600, easing = this.options.easing) {
    const {
      transform,
      transitionTimingFunction,
      transitionDuration
    } = utils.style;

    const { maxOffsetX, maxOffsetY } = this;
    const x = newX > 0 ? 0 : (newX < maxOffsetX ? maxOffsetX : newX);
    const y = newY > 0 ? 0 : (newY < maxOffsetY ? maxOffsetY : newY);

    this.translateX = x;
    this.translateY = y;
    this.scrollerStyle[transitionTimingFunction] = easing.style;
    this.scrollerStyle[transitionDuration] = `${time}ms`;
    this.scrollerStyle[transform] = `translate3d(${x}px, ${y}px, 0)`;
  }

  isOutOfBounds(x, y) {
    return (x > 0 || x < this.maxOffsetX || y > 0 || y < this.maxOffsetY);
  }

  handleOutOfBounds(x, y) {
    if (x > 0 || this.maxOffsetX > 0) {
      x = 0;
    } else if (x < this.maxOffsetX) {
      x = this.maxOffsetX;
    }

    if (y > 0 || this.maxOffsetY > 0) {
      y = 0;
    } else if (y < this.maxOffsetY) {
      y = this.maxOffsetY;
    }

    this.scrollTo(x, y);
    this.translateX = x;
    this.translateY = y;
  }

  render() {
    const {
      children,
      style
    } = this.props;

    return (
      <div
        ref="wrapper"
        style={{...defaultStyles, ...style}}
        onTouchStart={::this.start}
        onTouchMove={::this.move}
        onTouchEnd={::this.end}
      >
        <div ref="scroller">{children}</div>
      </div>
    );
  }
}

export default Scroller;