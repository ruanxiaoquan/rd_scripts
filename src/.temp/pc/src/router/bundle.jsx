import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

class Bundle extends Component {
  state = {
    mod: null,
    animate: '',
  };

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load != this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    this.setState({ mod: null });
    props.load((mod) =>
      this.setState(
        {
          mod: mod.default ? mod.default : mod,
        },
        () => {},
      ),
    );
  }

  render() {
    return this.state.mod ? (
      <div className={this.state.animate}>
        {this.props.children(this.state.mod)}
      </div>
    ) : (
      <div style={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }
}

Bundle.propTypes = {
  load: PropTypes.func,
  children: PropTypes.func,
};

let styles = {
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  img: {
    width: 370,
    height: 200,
  },
};

function pageFactory(lazyMoudle) {
  return (props) => (
    <Bundle load={lazyMoudle}>{(Factory) => <Factory {...props} />}</Bundle>
  );
}

export default { pageFactory };
