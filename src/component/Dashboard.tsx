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
import ShowTheLocation from './ShowTheLocation';

@inject('auth')
@observer
export default class Dashboard extends React.Component {


    constructor(props: any) {
        super(props);


    }

    @action
    async componentDidMount() {

        var _t = this;
        await this.props.auth.autoLogin();
        runInAction(() => {
            _t.checkLogin = true;

            console.log(_t);
        });

    }

    @observable checkLogin: boolean = false;
    props: {
        auth?: any,
        location:any
    };

    render() {
        if (!this.checkLogin) {
            return <div>Loading1{this.checkLogin + ''}</div>;
        } else {
            if (!this.props.auth.loggedIn) {
                return <Redirect to="/login"/>;
            }
        }
        // if (!this.props.auth.loggedIn) {
        //     return <Redirect to="/login"/>;
        // }

        // A simple component that shows the pathname of the current location


// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
        const ShowTheLocationWithRouter = withRouter(ShowTheLocation);


        return (
            <Layout>
                <Header className="App-header">
                    <div className="App-logo" style={{color: 'White'}}>
                        <div
                            onClick={e => this.props.auth.signout()}> {this.checkLogin + ''} {this.props.auth.userInfo.username}</div>
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
        );
    }


}