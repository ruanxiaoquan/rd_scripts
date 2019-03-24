import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

import './Index.scss';

@inject('appStore')
@withRouter
@observer
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.appStore.getBugs();
  }

  render() {
    return <div className="index_wrapper">Index</div>;
  }
}
