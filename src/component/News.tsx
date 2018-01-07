import {Form, List, Avatar, Card, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import MoliEditor from './editor';
import * as React from 'react';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import {observable, computed, runInAction} from 'mobx';
import {observer, Provider} from "mobx-react";
import elementClass from 'element-class';
import MBlock from './MBlock';

import Reading from './Reading';
import {ViewMode} from "./Reading";
import axios from 'axios';


interface CardProps {
    onClick?:any
}



const reading = new Reading();

@observer
export default class News extends React.Component {


    @observable book: any = {}




    @computed
    get hasParagraphs() {
        return (this.book && this.book.paragraphs);
    }


    async componentDidMount() {

        let rst = await axios.get('http://localhost:4000/getBookById');
        if (rst.data.code === 1) {
            // this.book = rst.data.data;
            let book = rst.data.data;
            if (book && book.paragraphs) {

                let rst = await axios.post('http://localhost:4000/getRemarksByParagraphIds', {
                    book_id: book._id,
                    paragraph_ids: book.paragraphs.map(p => p._id).join(".")

                });
                if (rst.data.code === 1) {
                    let group = rst.data.data;
                    book.paragraphs.map(p => {
                        var r = group[p._id];
                        p.remarks = r ? r : null
                    })

                    runInAction(() => {
                        this.book = book;
                    })


                }


            }


        }

    }


    async saveCommit() {
        var result = await reading.saveCommit();
        console.log(result);
        if(result){

        }
    }

    render() {
        // var blocks = [];
        // for (var i = 0; i < 3; i++) {
        //     blocks.push(<MBlock key={i} content={''}></MBlock>);
        //}

        // console.log(this.book);

        var blocks = (this.hasParagraphs) ?
            this.book.paragraphs.map((p) => <MBlock default_remarks={p.remarks} book_id={this.book._id}
                                                    paragraph_id={p._id} key={p._id}
                                                    content={p.en_content}></MBlock>) :
            [];


        // var viewMode = reading.currentCommit._id?ViewMode.view
        //todo 有空研究下 为啥不能直接写在元素里边 onClick={()=>reading.setViewMode(ViewMode.edit)}
        var other={
            onClick:()=>reading.setViewMode(ViewMode.edit)
        }

        return (

            <Provider reading={reading}>
                <Row >
                    <Col span={12}>
                        <div>{this.book.cn_name}</div>
                        <div>{this.book.en_name}</div>
                        <div className='canvas-reader'>
                            {blocks}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>{reading.currentCommit.text}</div>
                        {/*onClick={()=>reading.setViewMode(ViewMode.edit)}*/}
                        {
                            reading.viewMode===ViewMode.view ?
                                <Card {...other} style={{width: 300}}><p dangerouslySetInnerHTML={{__html: reading.currentCommit.remark}}></p></Card> :
                                <div>

                                    <MoliEditor
                                        value={reading.currentCommit.remark}
                                        onChange={(html) => reading.setCurrentRemark(html)}></MoliEditor>

                                    <Button type="primary" onClick={this.saveCommit.bind(this)}
                                            htmlType="submit">save</Button>
                                </div>
                        }


                        <List
                            itemLayout="horizontal"
                            dataSource={reading.currentCommit.relatedRemarks}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar
                                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                        title={<a href="https://ant.design">{item.text}</a>}
                                        description={<div dangerouslySetInnerHTML={{__html: item.remark}}></div>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </Provider>



        )
    }


}