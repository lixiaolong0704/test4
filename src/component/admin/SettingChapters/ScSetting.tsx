import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import * as React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import {MRForm, Button, Input, MlModal, Icon, PerfectScrollbar} from 'ui/index';


@observer
export default class ScSetting extends React.Component {


    async componentDidMount() {


    }



    renderScSettings(c) {
        return <span>

        </span>

    }

    render() {


        return (
            <span className='sc-setting'>
                开始
            </span>

        );
    }


}