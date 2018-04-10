import {List, Pagination} from 'antd';
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import {observable, computed, autorun, action, runInAction, useStrict} from 'mobx';
import * as React from 'react';
import axios from 'axios';
import {observer, inject} from 'mobx-react';
import Auth from './store/Auth';
import {Layout, Menu, Breadcrumb} from 'antd';
import PropTypes from 'prop-types';

import Icon1 from '-!svg-react-loader?name=Icon1!./svg/interface.svg';

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
import Book from './client/book/Book';
import News from './News';
import Read from './client/book/Read';

// import Book from ''

import BookManage from './admin/BookManage';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
import ShowTheLocation from './ShowTheLocation';
import svg from './svg/interface.svg'

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
        location: any
    };

    render() {
        if (!this.checkLogin) {
            return <div>Loading1{this.checkLogin + ''}</div>;
        } else {
            if (!this.props.auth.loggedIn) {
                return <Redirect to="/login"/>;
            }
        }


        const ShowTheLocationWithRouter = withRouter(ShowTheLocation);

        return (<div className='app'>

                <header className="app-header">
                    <span className="app-header__logo" style={{color: 'White'}}>

                    </span>
                    <span className="app-header__right">
                        <a className='app-header__signout' onClick={e => this.props.auth.signout()}> {this.props.auth.userInfo.username} </a>
                    </span>
                </header>
                <Switch>
                    <Route  path="/read/:book_id"  component={(location: any) => <Read location={location}/>}/>
                    <Route  component={() => (

                        <div className='app-main'>
                            <div  className='app-main__side'>
                                <ul className='app-menu'>
                                    <li className='app-menu__item'><NavLink activeClassName="app-menu__item_selected" to="/book">    <Icon1/>发现</NavLink></li>
                                    <li className='app-menu__item'><NavLink activeClassName="app-menu__item_selected" to="/fragment">碎片</NavLink></li>
                                    <li className='app-menu__item'>书架</li>
                                    <li className='app-menu__item'>复习</li>

                                    <li className='app-menu__item'><NavLink activeClassName="app-menu__item_selected" to="/admin_book">管理</NavLink></li>
                                </ul>
                            </div>
                            <div  className='app-main__content'>
                                <Switch>
                                    <Route exact path="/" component={() => (<div>home</div>)}/>
                                    <Route path="/fragment" component={() => <div><Fragment></Fragment></div>}/>
                                    <Route path="/book" component={(mc) => <Book></Book>}/>
                                    <Route path="/news" component={(mc: any) => (<News/>)}/>
                                    <Route path="/admin_book/:page/:book_id"
                                           component={(location: any) => <Read location={location}/>}/>
                                    <Route path="/admin_book/:page?" component={loc => <BookManage location={loc}/>}/>

                                    <Redirect to="/404"/>
                                </Switch>
                            </div>
                        </div>

                    )}/>
                </Switch>



            </div>
        );
    }


}