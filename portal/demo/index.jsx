import React from 'react';
import ReactDOM from 'react-dom';
import Portal from '../src/index.jsx';

ReactDOM.render(
  <Portal
    target={document.body}
    containerClassName="demo-container"
  >
    <p className="test">注意观察，这个节点的父div是通过Portal组件挂到了body下</p>
  </Portal>,
  document.querySelector('#wrapper')
);
