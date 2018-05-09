### 说明

通用蒙层组件，可以作为筛选、排序等浮层组件的容器

### PropTypes

|Prop|Type|Required|Default|Description|
|:---|:---|:-------|:------|:----------|
|isLockScrolling|boolean|N|true|当蒙层展示时，是否禁止滚动|
|isUseAnim|boolean|N|true|蒙层展示时是否使用渐隐渐现动画|
|animDuration|number|N|300|动画的时长，单位是ms，只有isUseAnim为true时才生效|
|zIndex|number|N|9999|蒙层的zIndex|
|isUsePortal|boolean|N|false|是否使用portal组件来改变蒙层的dom层级|
|containerClassName|string|N|''|蒙层外层容器的class，可以用于自定义样式|
|onTouchTapCb|function|N|()=>{}|点击蒙层时的回调|

### 使用方法

```
<div className="demo">
  <div className="btn-container">
    <div text="显示蒙层" onClick={this.show}>显示蒙层</div>
  </div>

  <Overlay
    ref={e => this.overlay = e}
    animDuration={300}
    onTouchTapCb={this.hide}
    isUseAnim
    isUsePortal
  />
</div>

```