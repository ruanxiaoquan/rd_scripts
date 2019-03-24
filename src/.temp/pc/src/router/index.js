import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
import routes from '../conifg/route.config';
import './app.scss';

export default class App extends React.Component {
  state = {
    collapsed: false,
    key: [],
    currentPath: {},
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    this.init();
  }

  init() {
    const path = window.location.pathname;
    this.setState({
      key: [path],
    });
  }

  onSelect = (select) => {
    const { key } = select;
    this.setState({
      key: [key],
    });
  };

  render() {
    const { key = [], collapsed } = this.state;
    return (
      <BrowserRouter basename="/">
        <div className="app">
          <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="logo">d</div>
              <Menu
                theme="dark"
                mode="inline"
                selectedKeys={key}
                onSelect={this.onSelect}
              >
                {routes.map((item, index) => (
                  <Menu.Item key={item.path}>
                    <Icon type={item.icon} />
                    <Link
                      style={{
                        display: collapsed ? 'block' : 'inline-block',
                      }}
                      to={item.path}
                    >
                      {item.name}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Header>
              {/* {routes.map((item, index) => (
                <Breadcrumb style={{ margin: '16px' }}>
                  <Breadcrumb.Item>首页</Breadcrumb.Item>
                  <Breadcrumb.Item>{item.name}</Breadcrumb.Item>
                </Breadcrumb>
              ))} */}
              <Content
                style={{
                  margin: '24px 16px 0 16px',
                  padding: 24,
                  background: '#fff',
                  minHeight: 900,
                }}
              >
                <Switch>
                  {routes.map((item) => (
                    <Route
                      key={item.path}
                      exact
                      path={item.path}
                      component={item.page}
                    />
                  ))}
                  <Redirect to="/index" />
                </Switch>
              </Content>
              <Footer className="footer">公司信息</Footer>
            </Layout>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}
