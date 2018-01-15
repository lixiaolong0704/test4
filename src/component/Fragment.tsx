import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import MoliEditor from './ui/editor';
import FragmentsList from './FragmentsList';


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

import * as React from 'react';
import {unescape} from "querystring";
import axios from 'axios';

export default class Fragment extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            current:{}
        };
    }
    list:any
    state: {
        current?: any
    }

    async save() {
        if (this.state && this.state.current) {

            if(this.state.current._id){ //add
                let rst = await axios.post('http://localhost:4000/updateFragment', this.state.current);
                if (rst.data.code === 1) {
                    alert('ok...');
                }
            }else{                      //update
                let rst = await axios.post('http://localhost:4000/addFragment', this.state.current);
                if (rst.data.code === 1) {
                    const current = this.state.current;
                    if (current) {
                        current._id = rst.data.data;
                        this.setState(current);
                    }
                    alert('save ok...');
                }
            }

            this.list.loadData();

        }
    }

    onChange(v, pname) {
        const current = this.state.current;
        if (current) {
            current[pname] = v;
            this.setState(current);
        }

    }
    add(){

        this.setState({
            current:{}
        })
    }
    render() {


        return (

            <Row>
                <Col span={12}>

                    <Button onClick={this.add.bind(this)}>Add</Button>
                    <FragmentsList
                        ref={(list)=>this.list=list}

                        onUpdateCurrentFragment={(item) => this.setState({current: item})}
                    ></FragmentsList>

                </Col>
                <Col span={12}>
                    {
                        this.state.current ? <Form>
                            <FormItem
                                label="ref"
                            >
                                <Input type="text" onChange={(e) => this.onChange(e.target.value, 'name')}
                                       value={this.state.current.name}/>

                            </FormItem>
                            <FormItem
                                label="link"
                            >
                                <Input type="text" onChange={(e) => this.onChange(e.target.value, 'ref_link')}
                                       value={this.state.current.ref_link}/>

                            </FormItem>
                            <FormItem label="content">
                                <MoliEditor onChange={(v) => this.onChange(v, 'ref_content')}
                                            value={this.state.current.ref_content}></MoliEditor>

                            </FormItem>
                            <FormItem>
                                <Button type="primary" onClick={this.save.bind(this)} htmlType="submit">save</Button>
                            </FormItem>
                        </Form> : ''
                    }

                </Col>

            </Row>

        )
    }


}