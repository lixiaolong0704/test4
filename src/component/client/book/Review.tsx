import './Review.scss';
import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import * as React from 'react';
import api from '../../../api';
import {Scrollbars} from 'react-custom-scrollbars';

@observer
export default class Review extends React.Component {



    async componentDidMount() {

    }



    render() {


        return (
            <div className='review'>

                Review


            </div>
        );
    }


}