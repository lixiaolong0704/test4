import {Form, List, Avatar, Card, Row, Col, Button, AutoComplete} from 'antd';

const ButtonGroup = Button.Group;
import MoliEditor from './../../ui/editor';
import * as React from 'react';
import {observable, computed, runInAction} from 'mobx';
import {observer, Provider} from 'mobx-react';
import MBlock from './../../MBlock';
import Reading from '../../store/Reading';
import {ViewMode} from '../../store/Reading';
import api from '../../../api';
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
export default class Read extends React.Component {


    props: {
        location: any
    }

    @observable book: any = {};
    readerDiv: any;

    @computed
    get book_id() {
        return this.props.location.match.params.book_id;
    }

    @computed
    get hasParagraphs() {
        return (this.book && this.book.paragraphs);
    }


    async loadMoreParagrames(direction: ScrollDirection, batchNum) {


        this.isLoading = true;
        let rst = await api.get(`/book/getBookParagraphsByIndex/${this.book_id}/${batchNum}`);

        if (rst.code === 1) {
            var paragraphs = rst.data.paragraphs;

            if(paragraphs.length===0){
                this.isLoadOver=true;
                this.isLoading = false;
                return;
            }


            // await this.loadParagraphsRemarks(this.book_id,paragraphs);
            var s = (this.book.paragraphs.length / this.queryPs.batchElementSize);
            var getCurrentBatchSize = this.book.paragraphs.length % this.queryPs.batchElementSize === 0 ? s : (s + 1);




            runInAction(() => {
                if (direction === ScrollDirection.Down) {
                    if(paragraphs.length % this.queryPs.batchElementSize !==0){
                        this.isLoadOver=true;
                    }

                    //dom中可以加载的最大maxBatchSize
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

                    var firstP = this.readerDiv.querySelector(".canvas-reader__p");

                    var preScrollHeight = this.readerDiv.scrollHeight;

                    setTimeout(() => {
                        // firstP.scrollIntoView();
                        console.log((this.readerDiv.scrollHeight - preScrollHeight) + "..")
                    })


                    this.book.paragraphs.splice(this.book.paragraphs.length - paragraphs.length, paragraphs.length);
                    this.isLoadOver=false;
                    // this.book.paragraphs.unshift(...paragraphs);
                    _.map(_.reverse(paragraphs), (p) => {
                        //unshift : Add new items to the beginning of an array
                        this.book.paragraphs.unshift(p);
                    });

                    this.topBatchNum = batchNum;
                    this.bottomBatchNum--;


                }

                this.isLoading = false;
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
    isLoadOver:boolean =false;


    //load remarks of paragraphs  and bind to paragraphs
    async loadParagraphsRemarks(book_id: string, paragraphs: Array<any>) {


        let rst = await api.post('/remark/getRemarksByParagraphIds', {
            book_id: book_id,
            paragraph_ids: paragraphs.map(p => p._id).join('.')

        });
        if (rst.code === 1) {
            let group = rst.data;
            paragraphs.map(p => {
                var r = group[p._id];
                p.remarks = r ? r : null;
            });
        }

    }


    async componentDidMount() {


        let rst = await api.get(`/book/getBookMainInfoById/${this.props.location.match.params.book_id}/${this.queryPs.batchNum}`);
        if (rst.code === 1) {
            // this.book = rst.data.data;
            var book = rst.data;
            if (book) {

                await this.loadParagraphsRemarks(book._id, book.paragraphs);
                runInAction(() => {
                    this.book = book;
                    setTimeout(() => {

                        var _t = this;
                        this.readerDiv.addEventListener('scroll', () => {

                            // console.log(this.readerDiv.scrollHeight);
                            if (_t.isLoading) {
                                return;
                            }

                            var h = (_t.readerDiv.scrollHeight - _t.readerDiv.offsetHeight);
                            //almost bottom load more
                            if ((_t.readerDiv.scrollTop + _t.bounceHeight ) >= h && (!this.isLoadOver)) {

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


    async saveCommit() {
        var result = await reading.saveCommit();
        console.log(result);
        if (result) {

        }
    }

    Next() {
        this.readerDiv.scrollTop += this.readerDiv.clientHeight;
    }

    Pre() {
        var n = this.readerDiv.scrollTop - this.readerDiv.clientHeight;
        // if(n>=0){
        this.readerDiv.scrollTop = n;
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
                <div>
                    <Row>
                        <Col>
                            <ButtonGroup>
                                <Button type="primary" icon="cloud"/>
                                <Button type="primary" icon="cloud-download"/>
                            </ButtonGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div>{this.topBatchNum + '---' + this.bottomBatchNum} </div>
                            <div><Button onClick={this.Pre.bind(this)}>Pre</Button> <Button
                                onClick={this.Next.bind(this)}>Next</Button></div>
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
                </div>

            </Provider>



        );
    }


}