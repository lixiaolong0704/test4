import {Form, List, Avatar, Card, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import MoliEditor from './editor';
import * as React from 'react';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import {observable, computed, runInAction} from 'mobx';
import {observer, Provider} from 'mobx-react';
import elementClass from 'element-class';
import MBlock from './MBlock';

import Reading from './store/Reading';
import {ViewMode} from './store/Reading';
import api from '../api';
import _ from 'lodash';


interface CardProps {
    onClick?: any
}

enum ScrollDirection {
    Up,
    Down
}

const reading = new Reading();

@observer
export default class News extends React.Component {


    @observable book: any = {};
    readerDiv: any;


    @computed
    get hasParagraphs() {
        return (this.book && this.book.paragraphs);
    }


    async loadMoreParagrames(direction: ScrollDirection, batchNum) {
        this.isLoading = true;
        let rst = await api.get(`/book/getBookParagraphsByIndex/${batchNum}`);
        this.isLoading = false;
        if (rst.code === 1) {
            var paragraphs = rst.data.paragraphs;

            var s = (this.book.paragraphs.length / this.queryPs.batchElementSize);
            var getCurrentBatchSize = this.book.paragraphs.length % this.queryPs.batchElementSize === 0 ? s : (s + 1);



            runInAction(() => {
                if (direction === ScrollDirection.Down) {

                    if (getCurrentBatchSize === this.maxBatchSize) {
                        this.book.paragraphs.splice(0, paragraphs.length);
                        this.topBatchNum++;
                    }
                    // this.book.paragraphs=[];
                    _.map(paragraphs, (p) => {
                        this.book.paragraphs.push(p);
                    });
                    this.bottomBatchNum = batchNum;

                } else {

                    // var nb = this.book.paragraphs

                    var firstP= this.readerDiv.querySelector(".canvas-reader__p");
                    setTimeout(()=>{
                        firstP.scrollIntoView();
                    })


                    this.book.paragraphs.splice(this.book.paragraphs.length - paragraphs.length, paragraphs.length);
                    // this.book.paragraphs.unshift(...paragraphs);
                    _.map(_.reverse(paragraphs), (p) => {
                        this.book.paragraphs.unshift(p);
                    });

                    this.topBatchNum = batchNum;
                    this.bottomBatchNum--;



                }


            });


        }


    }


    queryPs: any = {
        batchNum: 1,
        batchElementSize: 10

    };
    @observable topBatchNum: number = 1;
    @observable bottomBatchNum: number = 1;
    bounceHeight: number = 100;
    maxBatchSize: number = 2;
    isLoading: boolean = false;


    async componentDidMount() {


        let rst = await api.get(`/book/getBookMainInfoById/${this.queryPs.batchNum}`);
        if (rst.code === 1) {
            // this.book = rst.data.data;
            let book = rst.data;
            if (book) {

                // runInAction(() => {
                //     console.log(book);
                //     this.book = book;
                // });

                let rst = await api.post('/remark/getRemarksByParagraphIds', {
                    book_id: book._id,
                    paragraph_ids: book.paragraphs.map(p => p._id).join('.')

                });
                if (rst.code === 1) {
                    let group = rst.data;
                    book.paragraphs.map(p => {
                        var r = group[p._id];
                        p.remarks = r ? r : null;
                    });

                    runInAction(() => {
                        this.book = book;
                        setTimeout(() => {
                            console.log(this.readerDiv.innerHeight);
                            var _t = this;
                            this.readerDiv.addEventListener('scroll', () => {

                                // console.log(this.readerDiv.scrollHeight);
                                if(_t.isLoading){
                                    return;
                                }

                                var h = (_t.readerDiv.scrollHeight - _t.readerDiv.offsetHeight);
                                //almost bottom load more
                                if ((_t.readerDiv.scrollTop + _t.bounceHeight ) >= h) {

                                    _t.loadMoreParagrames(ScrollDirection.Down, _t.bottomBatchNum + 1);

                                }
                                // almost top
                                if (( _t.readerDiv.scrollTop <= _t.bounceHeight) && _t.topBatchNum > 1) {

                                    _t.loadMoreParagrames(ScrollDirection.Up, _t.topBatchNum - 1);

                                }


                            });

                        });


                    });


                }


            }


        }

    }


    async saveCommit() {
        var result = await reading.saveCommit();
        console.log(result);
        if (result) {

        }
    }

    Next(){
        this.readerDiv.scrollTop += this.readerDiv.clientHeight;
    }
    Pre(){
        var n=  this.readerDiv.scrollTop - this.readerDiv.clientHeight;
        // if(n>=0){
            this.readerDiv.scrollTop =n;
        // }

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
        var other = {
            onClick: () => reading.setViewMode(ViewMode.edit)
        };

        return (

            <Provider reading={reading}>
                <Row>
                    <Col span={12}>
                        <div>{this.topBatchNum +'---' +this.bottomBatchNum} </div>
                        <div><Button onClick={this.Pre.bind(this)}>Pre</Button> <Button onClick={this.Next.bind(this)}>Next</Button>  </div>
                        <div>{this.book.cn_name}</div>
                        <div>{this.book.en_name}</div>
                        <div ref={readerDiv => this.readerDiv = readerDiv} className='canvas-reader'>
                            {blocks}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>{reading.currentCommit.text}</div>
                        {/*onClick={()=>reading.setViewMode(ViewMode.edit)}*/}
                        {
                            reading.viewMode === ViewMode.view ?
                                <Card {...other} style={{width: 300}}><p
                                    dangerouslySetInnerHTML={{__html: reading.currentCommit.remark}}></p></Card> :
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



        );
    }


}