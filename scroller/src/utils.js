/**
 * Created by hxstudio on 2018/5/18.
 */

export const rAF = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };

export const utils = (function () {
  let me = {};

  // 获取浏览内核支持的CSS前缀
  const _elementStyle = document.createElement('div').style;
  const _vendor = (function () {
    let vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
      transform,
      l = vendors.length;

    for(let i = 0; i < l; i++){
      transform = vendors[i] + 'ransform';
      if(transform in _elementStyle){
        return vendors[i].substr(0, vendors[i].length-1)
      }
    }

    return false;
  })();

  // 拼接获取浏览器内核所支持的CSS样式全称，比如webkitTransform
  const _prefixStyle = (style) => {
    if(_vendor === false){
      return false;
    }

    if(_vendor === ''){
      return style;
    }

    return `${_vendor}${style.charAt(0).toUpperCase()}${style.substr(1)}`;
  }

  // 获取当前时间
  me.getTime = Date.now || function() { return new Date().getTime(); }

  // 对象继承
  me.extend = (target, obj) => {
    for(let i in obj){
      target[i] = obj[i];
    }
  }

  // 给指定节点绑定事件
  me.addEvent = (el, type, fn, capture) => {
    el.addEventListener(type, fn, !!capture);
  }

  // 给指定节点取消绑定事件
  me.removeEvent = (el, type, fn, capture) => {
    el.removeEventListener(type, fn, !!capture);
  }

  me.prefixPointEvent = (pointerEvent) => {
    return window.MSPointerEvent ? `MSPointer${pointerEvent.charAt(7).toUpperCase()}${pointerEvent.substr(8)}` : pointerEvent;
  }

  me.momentum = (current, start, time, lowerMargin, wrapperSize, deceleration=0.0006) => {
    let distance = current - start,
      speed = Math.abs(distance) / time,
      destination,
      duration;

    destination = current + (speed * speed) / ( 2 * deceleration) * (distance < 0 ? -1 : 1);
    duration = speed / deceleration;

    if(destination < lowerMargin){
      destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
      distance = Math.abs(destination - current);
      duration = distance / speed;
    } else if(destination > 0){
      destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
      distance = Math.abs(current) + destination;
      duration = distance / speed;
    }

    return {
      destination: Math.round(destination),
      duration
    }
  }

  let _transform = _prefixStyle('transform');

  me.extend(me, {
    hasTransform: _transform !== false,
    hasPerspective: _prefixStyle('perspective') in _elementStyle, // perspective 属性定义 3D 元素距视图的距离，以像素计
    hasTouch: 'ontouchstart' in window,
    hasPointer: !!(window.PointerEvent || window.MSPointerEvent),
    hasTransition: _prefixStyle('transition') in _elementStyle
  });

  // 是否是低端android系统
  me.isBadAndroid = (function () {
    const appVersion = window.navigator.appVersion;

    if(/Android/.test(appVersion) && !(/Chrome\/\d/.test(appVersion))){
      const safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
      if(safariVersion && typeof safariVersion === 'object' && safariVersion.length >= 2){
        return parseFloat(safariVersion[1] < 535.19);
      } else {
        return false;
      }
    } else {
      return false;
    }
  })();

  me.extend(me.style={}, {
    transform: _transform,
    transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
    transitionDuration: _prefixStyle('transitionDuration'),
    transitionDelay: _prefixStyle('transitionDelay'),
    transformOrigin: _prefixStyle('transformOrigin')
  });

  // 判断指定DOM节点是否有指定class
  me.hasClass = (element, cls) => {
    const reg = new RegExp(`(^|\\s)${cls}(\\s|$)`);
    return reg.test(element.className);
  }

  // 为指定DOM节点增加指定class
  me.addClass = (element, cls) => {
    if(me.hasClass(element, cls)){
      return;
    }

    const newCls = element.className.split(' ');
    newCls.push(cls);
    element.className = newCls.join(' ');
  }

  // 为指定DOM节点删除指定class
  me.removeClass = (element, cls) => {
    if(!me.hasClass(element, cls)){
      return;
    }

    const re = new RegExp(`(^|\\s)${cls}(\\s|$)`, 'g');
    element.className = element.className.replace(re, ' ');
  }

  me.offset = (el) => {
    let left = -el.offsetLeft;
    let top = -el.offsetTop;

    while(el = el.offsetParent){ //与当前元素最近的经过定位(position不等于static)的父级元素
      left -= el.offsetLeft;
      top -= el.offsetTop;
    }

    return {
      left,
      top
    }
  }

  me.preventDefaultException = (el, exceptions) => {
    for(let i in exceptions){
      if(exceptions[i].test(el[i])){
        return true;
      }
    }

    return false;
  }

  me.extend(me.eventType = {}, {
    touchstart: 1,
    touchmove: 1,
    touchend: 1,

    mousedown: 2,
    mousemove: 2,
    mouseup: 2,

    pointerdown: 3,
    pointermove: 3,
    pointerup: 3,

    MSPointerDown: 3,
    MSPointerMove: 3,
    MSPointerUp: 3
  });

  me.extend(me.ease = {}, {
    quadratic: {
      style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      fn: (k) => {
        return k * ( 2 - k);
      }
    },

    circular: {
      style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
      fn: (k) => {
        return Math.sqrt(1 - (--k * k));
      }
    },

    back: {
      style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      fn: (k) => {
        const b = 4;
        return (k = k - 1) * k * ( (b + 1) * k + b ) + 1
      }
    },

    bounce: {
      style: '',
      fn: (k) => {
        if( (k /= 1) < ( 1/ 2.75) ){
          return 7.5625 * k * k;
        } else if ( k < ( 2 / 2.75) ){
          return 7.5625 * ( k -= ( 1.5 / 2.75 )) * k + 0.75;
        } else if( k < ( 2.5 / 2.75 ) ) {
          return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
        } else {
          return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
        }
      }
    },

    elastic: {
      style: '',
      fn: (k) => {
        const f = 0.22;
        const e = 0.4;

        if ( k === 0) { return 0;}
        if ( k == 1) { return 1;}

        return ( e * Math.pow( 2, -10 * k ) * Math.sin( ( k - f / 4) * ( 2 * Math.PI ) / f ) +1 );
      }
    }
  });

  me.tap = (e, eventName) => {
    const ev = document.createEvent('Event');
    ev.initEvent(eventName, true, true);
    ev.pageX = e.pageX;
    ev.pageY = e.pageY;
    e.target.dispatchEvent(ev);
  };

  me.click = (e) => {
    let target = e.target;
    let ev;

    if ( !(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName) ){
      ev = document.createEvent('MouseEvents');
      ev.initMouseEvent('click', true, true, e.view, 1,
        target.screenX, target.screenY, target.clientX, target.clientY,
        e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
        0, null
      );

      ev._constructed = true;
      target.dispatchEvent(ev);
    }
  }

  return me;
})();