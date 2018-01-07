import {List, Pagination} from 'antd';
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import {observable, computed, autorun, action, runInAction, useStrict} from 'mobx';
import * as React from 'react';
import axios from 'axios';
import {observer, inject} from 'mobx-react';
import Auth from './store/Auth';
import {Layout, Menu, Breadcrumb} from 'antd';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    matchPath,
    Switch,
    withRouter,
    Redirect
} from 'react-router-dom';
import Fragment from './Fragment';
import Book from './Book';
import News from './News';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

@inject("auth")
export default class Dashboard extends React.Component {


    constructor(props: any) {
        super(props);
    }

    props:{
        auth?:any
    }
    render() {

        // A simple component that shows the pathname of the current location
        class ShowTheLocation extends React.Component {
            static propTypes = {
                match: PropTypes.object.isRequired,
                location: PropTypes.object.isRequired,
                history: PropTypes.object.isRequired
            };
            props: {
                match: any,
                location: any,
                history: any

                onLocationChange?: any

            };

            setActive({item, key}) {
                // this.setState({activeKey:key});
            }

            onLocationChange() {
                console.log('change...');
                // this.setState({activeKey:"book"});
            }

            constructor(props) {
                super(props);

            }

            getActiveKey(location) {
                var keys = ['fragment', 'book', 'news'];
                var activeKey = null;
                keys.forEach((key) => {
                    if (matchPath(location.pathname, {
                            path: '/' + key,
                            strict: false,
                            exact: false,
                            sensitive: false
                        })) {
                        activeKey = key;
                        // this.state={
                        //     activeKey:key
                        // }
                    }

                });
                return activeKey;
            }

            state: {
                activeKey: any
            };

            render() {
                const {match, location, history} = this.props;

                // this.props.onLocationChange(location);


                const createNavLink = (to: string) => {
                    return <NavLink exact={false} activeClassName='selected' to={`/${to}`}>{to}</NavLink>;
                };


                return (
                    <Menu
                        mode="inline"

                        selectedKeys={[this.getActiveKey(location)]}
                        onClick={this.setActive.bind(this)}

                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        <SubMenu key="sub1" title={<span><Icon type="user"/>hihi</span>}>
                            <Menu.Item key="fragment">{createNavLink('fragment')}</Menu.Item>
                            <Menu.Item key="book">{createNavLink('book')}</Menu.Item>
                            <Menu.Item key="news">{createNavLink('news')}</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="laptop"/>subnav 2</span>}>
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="notification"/>subnav 3</span>}>

                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                    </Menu>
                );
            }
        }

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
        const ShowTheLocationWithRouter = withRouter(ShowTheLocation);


        return (
            <Layout>
                <Header className="header">
                    <div className="logo" style={{color: "White"}}>
                        <div onClick={e => this.props.auth.signout()}>   {this.props.auth.userInfo.username}</div>
                    </div>

                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} style={{background: '#fff'}}>

                        <ShowTheLocationWithRouter></ShowTheLocationWithRouter>


                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>

                            <Switch>
                                <Route exact path="/" component={() => (<div>home</div>)}/>
                                <Route path="/fragment" component={() => <div><Fragment></Fragment></div>}/>
                                <Route path="/book" component={(mc) => <Book match={mc}></Book>}/>
                                <Route path="/news" component={(mc: any) => (<News/>)}/>
                                <Redirect to="/404"/>
                            </Switch>

                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }


}