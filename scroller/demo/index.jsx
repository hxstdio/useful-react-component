import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MyComponent from '../src/index.jsx';
import './index.scss';

class Demo extends Component {

  render() {
    return <div>
      <section>
        <h3>水平滚动</h3>
        <div className="horizontal-wrapper">
          <MyComponent
            direction="horizontal"
          >
            <div className="horizontal-view">横向滚动我试下, 横向滚动我试下, 横向滚动我试下, 横向滚动我试下, 横向滚动我试下</div>
          </MyComponent>
        </div>
      </section>
    </div>
  }
}

ReactDOM.render(
  <Demo />,
  document.querySelector('#wrapper')
);
