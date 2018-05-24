import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Scroller from '../src/index.jsx';
import './index.scss';

class Demo extends Component {

  renderList(num) {
    let items = [];
    for (let i = 0; i < num; i++) {
      items.push(<li key={i} className="item">这里是一个列表{i+1}</li>);
    }
    return items;
  }

  render() {
    return <div>
      <section>
        <h3>水平滚动</h3>
        <div className="horizontal-wrapper">
          <Scroller direction="horizontal">
            <ul className="hoz-list">
              {this.renderList(10)}
            </ul>
          </Scroller>
        </div>
      </section>

      <section>
        <h3>垂直滚动</h3>
        <div className="vertical-wrapper">
          <Scroller direction="vertical">
            <ul className="vertical-list">
              {this.renderList(10)}
            </ul>
          </Scroller>
        </div>
      </section>
    </div>
  }
}

ReactDOM.render(
  <Demo />,
  document.querySelector('#wrapper')
);
