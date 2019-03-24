import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import './Test.scss';

@inject()
@withRouter
@observer
export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="test_wrapper">Test</div>;
  }
}
