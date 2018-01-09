import {List, Pagination} from 'antd';
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import {observable, computed, autorun, action, runInAction, useStrict} from 'mobx';
import * as React from 'react';

import {observer, inject} from 'mobx-react';
import Auth from './store/Auth';
import api from  './../api';
import {

    Redirect
} from 'react-router-dom';

@inject("auth")
@observer
export default class Login extends React.Component {


    constructor(props: any) {
        super(props);
    }

    @observable
    redirectToReferrer: boolean = false
    props: {
        auth: Auth,
        location: any
    }

    async componentDidMount() {


    }

    // @observable t='';
    // @computed get mm(){
    //     return !!this.t;
    // }
    @action
    async login() {


        let rst = await api.post('/user/auth', {
            username: 'lixiaolong',
            password: "001"

        });
        if (rst.data.code === 1) {
            if (rst.data.data) {
                runInAction(() => {
                    this.props.auth.authenticate(rst.data.data)

                    this.redirectToReferrer = true;

                })

            } else {
                alert('是');
            }
        }


    }

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}}

        if (this.redirectToReferrer) {
            return (
                <Redirect to={from}/>
            )
        }


        return (
            <div>

                <Button onClick={this.login.bind(this)}>Login</Button>
            </div>
        )
    }


}