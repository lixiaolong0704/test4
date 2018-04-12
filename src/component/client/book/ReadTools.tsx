import './ReadTools.scss';
import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import * as React from 'react';

import ChapterIcon from 'assets/svg/kno_detail_chapter.svg';
import HistoryIcon from 'assets/svg/history.svg';

import ArrowUpIcon from 'assets/svg/cc-arrow-up-circle.svg';
import ArrowDownIcon from 'assets/svg/arrow.svg';

import ModeUpdownIcon from 'assets/svg/arrows-v.svg';
import ModeLeftRightIcon from 'assets/svg/arrow-swap.svg';

import SavePositionIcon from 'assets/svg/position.svg';


import classnames from 'classnames';

@observer
export default class ReadTools extends React.Component {


    @observable currentMode: any;
    props: {
        className?: any,
        mode: number// 1上下翻，2左右翻

        modeChange: any
        pre:Function,
        next:Function,
        savePosition?:Function
    };

    async componentDidMount() {


    }
//保存阅读位置

    render() {


        var cls = classnames('read-tools', this.props.className);
        return (
            <ul className={cls}>
                <li className='read-tools__item'
                    onClick={e => this.props.modeChange(this.props.mode === 1 ? 2 : 1)}>{this.props.mode === 1 ?
                    <ModeUpdownIcon/> : <ModeLeftRightIcon/>} </li>
                {
                    this.props.mode === 2 ? [
                        <li className='read-tools__item'><ArrowUpIcon onClick={this.props.pre.bind(this)}></ArrowUpIcon></li>,
                        <li className='read-tools__item'><ArrowDownIcon onClick={this.props.next.bind(this)}></ArrowDownIcon></li>
                    ] : ''
                }
                <li className='read-tools__item'><SavePositionIcon onClick={this.props.savePosition.bind(this)}></SavePositionIcon></li>



            </ul>
        );
    }


}