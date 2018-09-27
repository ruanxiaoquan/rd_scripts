import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd-mobile';
import './index.scss';

import { net } from './utils';

import Test from '@components/Test';

class App extends Component {
  render() {
    return (
      <div>
        <Test />
        <div className="text">ddddddd1111d</div>
        <img src="./img/x.jpeg" alt="" />
        <Button>dd</Button>
      </div>
    );
  }

  componentDidMount() {}

  ss() {
    console.log('哈哈哈哈');
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
