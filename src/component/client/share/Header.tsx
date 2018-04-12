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
import LogoIcon from 'assets/svg/logo.svg';

import DropdownApple from '../../../ui/dropdown-apple/index';
import ArrowDownIcon from 'assets/svg/icon-arrow-down.svg';
import ExitIcon from 'assets/svg/icon-exit.svg';
import SettingIcon from 'assets/svg/icon-setting.svg';

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
                    <span className="app-header__logo" style={{color: 'White'}}>
                           <NavLink to="/home">  <LogoIcon></LogoIcon> </NavLink>
                    </span>
                <span className="app-header__right noselect">
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