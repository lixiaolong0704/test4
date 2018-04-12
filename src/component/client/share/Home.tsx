import './Home.scss';
import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import * as React from 'react';
import api from '../../../api';
import {Scrollbars} from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';
import PerfectScrollbar from 'perfect-scrollbar';
import 'uis/perfect-scrollbar/perfect-scrollbar.css';

@observer
export default class Home extends React.Component {


    async componentDidMount() {

    }


    render() {


        return (
            <div className='home'>

                <div className='home__group'>
                    <div className='home__title'>关于Moliabc问题:</div>
                    <ul className='home__intro'>
                        <li>功能简介</li>
                        <li>怎么使用</li>
                        <li>我想读小说</li>
                        <li>我想记单词</li>

                    </ul>

                </div>


            </div>
        );
    }


}