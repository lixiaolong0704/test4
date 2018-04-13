import './Header.scss';
import {observable, computed, runInAction, action} from 'mobx';
import {observer, inject} from 'mobx-react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import * as React from 'react';
import api from '../../../api';
import {Scrollbars} from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';
import PerfectScrollbar from 'perfect-scrollbar';
import 'uis/perfect-scrollbar/perfect-scrollbar.css';
import LogoIcon from 'assets/svg/logo2.svg';

import DropdownApple from '../../../ui/dropdown-apple/index';
import ArrowDownIcon from 'assets/svg/icon-arrow-down.svg';
import ExitIcon from 'assets/svg/icon-exit.svg';
import SettingIcon from 'assets/svg/icon-setting.svg';


import FindIcon from 'assets/svg/interface.svg';
import MyBookIcon from 'assets/svg/003-books-stack-of-three.svg';
import FragmentIcon from 'assets/svg/001-fragments.svg';
import HomeIcon from 'assets/svg/icon-space.svg';

@inject('auth')
@observer
export default class Header extends React.Component {

    props: {
        auth?: any
    };

    async componentDidMount() {

    }

    render() {


        return (

            <header className="app-header">
                    <span className="app-header__side" style={{color: 'White'}}>
                           <NavLink to="/home"><LogoIcon></LogoIcon>   </NavLink>
                    </span>
                <span className="app-header__right noselect">
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



                        <DropdownApple button={<span
                            className='app-header__username'>{this.props.auth.userInfo.username}<ArrowDownIcon/></span>}>

                            <ul className='app-header__panel'>
                                <li> <a className='app-header__signout'
                                        onClick={e => this.props.auth.signout()}><SettingIcon/>账号设置</a></li>
                                 <li> <a className='app-header__signout'
                                         onClick={e => this.props.auth.signout()}><ExitIcon/>退出</a></li>
                            </ul>

                        </DropdownApple>

                    </span>
            </header>
        );
    }


}