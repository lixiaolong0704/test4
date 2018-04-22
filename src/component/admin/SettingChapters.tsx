import './SettingChapters.scss';
import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import * as React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import {MRForm, Button, Input, MlModal, Icon, PerfectScrollbar} from 'ui/index';
import api from '../../api';
import Bg from "./SettingChapters/Bg";

@observer
export default class SettingChapters extends React.Component {

    props: {
        closeModal: Function,
        bookId?: string
    };



    renderScSettings(c){
        return <span>

        </span>

    }
    render() {


        return (
            <div className='setting-chapters'>
                <MlModal
                    isOpen={true}
                    title="设置段落"
                    className="setting-chapters__modal"
                    closeModal={this.props.closeModal.bind(this)}
                    enableScollbar={true}
                >

                     <Bg bookId={this.props.bookId} closeModal={this.props.closeModal.bind(this)}/>
                </MlModal>
            </div>

        );
    }


}