import './ReadTabs.scss';
import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import * as React from 'react';

import ChapterIcon from 'assets/svg/kno_detail_chapter.svg';
import HistoryIcon from 'assets/svg/history.svg';
import UsersIcon from 'assets/svg/users.svg';

@observer
export default class ReadTabs extends React.Component {


    async componentDidMount() {


    }

    render() {


        return (
            <ul className='read-tabs'>
                <li className='read-tabs__tab'><ChapterIcon></ChapterIcon></li>
                <li className='read-tabs__tab'><HistoryIcon></HistoryIcon></li>
                <li className='read-tabs__tab'><UsersIcon></UsersIcon></li>
            </ul>
        );
    }


}