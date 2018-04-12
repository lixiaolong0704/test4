
import {observable, computed, autorun, action, runInAction, useStrict} from 'mobx';
import * as React from 'react';
import axios from 'axios';
import {observer, inject} from 'mobx-react';


import FindIcon from 'assets/svg/interface.svg';
import MyBookIcon from 'assets/svg/003-books-stack-of-three.svg';
import FragmentIcon from 'assets/svg/001-fragments.svg';

import HomeIcon from 'assets/svg/icon-space.svg';


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
import MyBook from './client/book/MyBook';
import Review from './client/book/Review';
import Home from './client/share/Home';





// import Book from ''

import BookManage from './admin/BookManage';


import ShowTheLocation from './ShowTheLocation';
import Header from './client/share/Header';

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

                <Header/>
                <Switch>
                    <Route path="/read/:book_id" component={(location: any) => <Read location={location}/>}/>
                    <Route component={() => (

                        <div className='row-layout'>
                            <div className='row-layout__side'>
                                <ul className='app-menu'>
                                    <li className='app-menu__item'>
                                        <NavLink activeClassName="app-menu__item_selected"
                                                 to="/home">
                                            <HomeIcon className='app-menu__icon'/>
                                            <span className='app-menu__text'>首页</span>
                                        </NavLink>
                                    </li>
                                    <li className='app-menu__item'>
                                        <NavLink activeClassName="app-menu__item_selected"

                                                 to="/book">
                                            <FindIcon className='app-menu__icon'/>
                                            <span className='app-menu__text'>发现</span>
                                        </NavLink>
                                    </li>
                                    <li className='app-menu__item'>
                                        <NavLink activeClassName="app-menu__item_selected"
                                                 to="/fragment">
                                            <FragmentIcon className='app-menu__icon'/>
                                            <span className='app-menu__text'>碎片</span>
                                        </NavLink>
                                    </li>
                                    <li className='app-menu__item'>
                                        <NavLink activeClassName="app-menu__item_selected"
                                                 to="/mybook">
                                            <FindIcon className='app-menu__icon'/>
                                            <span className='app-menu__text'>书架</span>
                                        </NavLink>
                                    </li>
                                    <li className='app-menu__item'>
                                        <NavLink activeClassName="app-menu__item_selected"
                                                 to="/review">
                                            <FindIcon className='app-menu__icon'/>
                                            <span className='app-menu__text'>复习</span>
                                        </NavLink>
                                    </li>

                                    <li className='app-menu__item'>
                                        <NavLink activeClassName="app-menu__item_selected"
                                                 to="/admin_book">
                                            <MyBookIcon className='app-menu__icon'></MyBookIcon>
                                            <span className='app-menu__text'>管理</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className='row-layout__content'>
                                <Switch>
                                    <Route exact path="/" component={() => (<Home></Home>)}/>
                                    <Route path="/home" component={() => (<Home></Home>)}/>
                                    <Route path="/fragment" component={() => <div><Fragment></Fragment></div>}/>
                                    <Route path="/book" component={(mc) => <Book></Book>}/>
                                    <Route path="/news" component={(mc: any) => (<News/>)}/>
                                    <Route path="/mybook" component={(mc) => <MyBook></MyBook>}/>
                                    <Route path="/review" component={(mc) => <Review></Review>}/>

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