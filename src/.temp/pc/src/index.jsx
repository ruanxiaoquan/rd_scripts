import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { Provider } from 'mobx-react';

import Router from './router';
import appStore from './stores/appStore';

const stores = { appStore };

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
