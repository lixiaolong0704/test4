import './ReadTabs.scss';
import {observer, Provider} from 'mobx-react';

import * as React from 'react';

import ChapterIcon from 'assets/svg/kno_detail_chapter.svg';
import HistoryIcon from 'assets/svg/history.svg';
import UsersIcon from 'assets/svg/users.svg';

import classnames from 'classnames';

@observer
export default class ReadTabs extends React.Component {


    props:{
        defaultTab:string //'Chapter',
        tabChange:Function
    }
    async componentDidMount() {


    }


    getProps(key){
        return {
            className:classnames('read-tabs__tab',{
                "read-tabs__tab--active":key===this.props.defaultTab
            }),
            onClick:()=>{
                this.props.tabChange(key);
            }
        }
    }

    render() {


        return (
            <ul className='read-tabs'>
                <li {...this.getProps('Chapter')}><ChapterIcon></ChapterIcon></li>
                <li {...this.getProps('History')}><HistoryIcon></HistoryIcon></li>
                <li {...this.getProps('Users')}><UsersIcon></UsersIcon></li>
            </ul>
        );
    }


}