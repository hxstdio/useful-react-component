### 说明

传送门组件，将children挂载到指定节点上(成为它的子节点)，默认为document.body

### PropTypes

|Prop|Type|Required|Default|Description|
|:---|:---|:-------|:------|:----------|
|children|element|Y|无|需要被传送的节点|
|target|element/node|N|document.body|被挂载的节点，children将成为target的子节点，默认为body|
|containerClassName|string|N|无|children的外层容器class名，可以用来自定义样式|

### 使用方法

```
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
```