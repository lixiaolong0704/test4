import {Modal, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import './BookEdit.css';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

import * as React from 'react';

import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import api from '../../api';


const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];


@observer
class BookEdit extends React.Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    props:{
        onClose:Function
        form:any
    }

    // @observable page:number=1;


    async componentDidMount() {


    }


    onOk() {

    }

    onCancel() {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    handleWebsiteChange = (value: any) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({autoCompleteResult});
    };


    render() {


        // const WrappedRegistrationForm = Form.create()(RegistrationForm);
        return (
            <div>
                <Modal
                    visible={true}
                >ee
                </Modal>
            </div>

        );
    }


}


export default  BookEdit;