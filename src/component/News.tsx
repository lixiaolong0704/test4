import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import MoliEditor from './editor';
import * as React from 'react';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import {observable, computed} from 'mobx';
import {observer, Provider} from "mobx-react";
import elementClass from 'element-class';
import MBlock from './MBlock';

import Reading from './Reading';
import axios from 'axios';

const reading = new Reading();

@observer
export default class News extends React.Component {


    @observable book: any ={}

    async componentDidMount() {

        let rst = await axios.get('http://localhost:4000/getBookById');
        if (rst.data.code === 1) {

            this.book = rst.data.data;
        }

    }


    saveCommit() {
        reading.saveCommit();
    }

    render() {
        // var blocks = [];
        // for (var i = 0; i < 3; i++) {
        //     blocks.push(<MBlock key={i} content={''}></MBlock>);
        //}

        console.log(this.book);

        var blocks = (this.book && this.book.paragraphs) ?
            this.book.paragraphs.map((p) => <MBlock book_id={this.book._id} paragraph_id={p._id} key={p._id} content={p.en_content}></MBlock>) :
            [];


        return (

            <Provider reading={reading}>
                <Row>
                    <Col span={12}>
                        <div>{this.book.cn_name}</div>
                        <div>{this.book.en_name}</div>
                        <div className='canvas-reader'>
                            {blocks}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>{reading.currentCommit.text}</div>

                        <MoliEditor
                            value={reading.currentCommit.remark}></MoliEditor>

                        <Button type="primary" onClick={this.saveCommit.bind(this)} htmlType="submit">save</Button>
                    </Col>
                </Row>
            </Provider>



        )
    }


}