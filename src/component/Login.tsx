import {Form, Icon, Input, Button, Checkbox} from 'antd';

const FormItem = Form.Item;
import {observable, computed, autorun, action, runInAction, useStrict} from 'mobx';
import * as React from 'react';

import {observer, inject} from 'mobx-react';
import Auth from './store/Auth';
import api from './../api';
import './Login.scss';

import {

    Redirect
} from 'react-router-dom';

@inject('auth')
@observer
export default class Login extends React.Component {


    constructor(props: any) {
        super(props);
    }

    @observable
    redirectToReferrer: boolean = false;


    props: {
        auth: Auth,
        location: any,
        form: any
    };

    async componentDidMount() {


    }


     handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let rst = await api.post('/user/auth',values);
                if (rst.code === 1) {
                    if (rst.data) {
                        runInAction(() => {
                            this.props.auth.authenticate(rst.data);
                            this.redirectToReferrer = true;

                        });

                    } else {
                        alert('是');
                    }
                }
            }
        });
    };

    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}};

        if (this.redirectToReferrer) {
            return (
                <Redirect to={from}/>
            );
        }

        const {getFieldDecorator} = this.props.form;

        return (
            <div className="login-form">
                <Form onSubmit={this.handleSubmit} className="login-form__form">
                    <div className='login-form__logo'></div>
                    <FormItem label='账号'>
                        {getFieldDecorator('username', {
                            initialValue:'lixiaolong',
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="Username"
                            />
                        )}
                    </FormItem>
                    <FormItem label='密码'>
                        {getFieldDecorator('password', {
                            initialValue:'001',
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="Password"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住密码</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">忘记密码</a>
                        <br/>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </FormItem>
                </Form>
            </div>



        );
    }


}