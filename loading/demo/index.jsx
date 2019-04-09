import React from 'react';
import ReactDOM from 'react-dom';

// 引入tap插件
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import PageDemo from './pageDemo.jsx';

ReactDOM.render(
  <PageDemo />,
  document.querySelector('#wrapper')
);
