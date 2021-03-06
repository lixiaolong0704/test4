import {Form, List, Spin, Avatar, Card, Row, Col, Button, AutoComplete} from 'antd';
import './Read.scss';


import MoliEditor from './../../ui/editor';
import * as React from 'react';
import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider,inject} from 'mobx-react';
import MBlock from './../../MBlock';
import Reading from '../../store/Reading';
import {ViewMode} from '../../store/Reading';
import api from '../../../api';
import _ from 'lodash';
import classnames from 'classnames';
import ReadTabs from './ReadTabs';
import ReadTools from './ReadTools';

import CloseIcon from 'assets/svg/arrow.svg';

import ArrowRightIcon from 'assets/svg/ar2.svg';
import ArrowLeftIcon from 'assets/svg/ar1.svg';
import ClickOutside from 'react-click-outside';

interface CardProps {
    onClick?: any
}

enum ScrollDirection {
    Up,
    Down
}

const reading = new Reading();

@inject('global')
@observer
export default class Read extends React.Component {


    props: {
        location: any,
        global?:any
    };

    @observable book: any = {};

    @observable mode: number = 1;

    readerDiv: any;

    @computed
    get book_id() {
        return this.props.location.match.params.book_id;
    }

    @computed
    get maxBatchs() {
        var z = this.book.psize % this.queryPs.batchElementSize === 0;
        var s = this.book.psize / this.queryPs.batchElementSize;
        return z ? s : s + 1;
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
            runInAction(() => {
                if (paragraphs.length === 0) {
                    this.isLoadOver = true;
                    this.isLoading = false;
                    return;
                }
                // await this.loadParagraphsRemarks(this.book_id,paragraphs);
                var s = (this.book.paragraphs.length / this.queryPs.batchElementSize);
                var getCurrentBatchSize = this.book.paragraphs.length % this.queryPs.batchElementSize === 0 ? s : (s + 1);


                if (direction === ScrollDirection.Down) {
                    if (paragraphs.length % this.queryPs.batchElementSize !== 0) {
                        this.isLoadOver = true;
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

                    var firstP = this.readerDiv.querySelector('.canvas-reader__p');

                    var preScrollHeight = this.readerDiv.scrollHeight;

                    setTimeout(() => {
                        // firstP.scrollIntoView();
                        if(this.readerDiv){

                        }
                        console.log((this.readerDiv.scrollHeight - preScrollHeight) + '..');
                    });


                    this.book.paragraphs.splice(this.book.paragraphs.length - paragraphs.length, paragraphs.length);
                    this.isLoadOver = false;
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


    @observable topBatchNum: number = 1;
    @observable bottomBatchNum: number = this.topBatchNum;

    queryPs: any = {
        batchNum: this.topBatchNum,

        //每次请求段落的个数
        batchElementSize: 10

    };
    bounceHeight: number = 100;
    maxBatchSize: number = 2;
    @observable isLoading: boolean = false;
    @observable isLoadOver: boolean = false;


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
                        var lastScrollTop = 0;
                        this.readerDiv.addEventListener('scroll', action((e) => {

                            console.log(e);
                            var st = _t.readerDiv.scrollTop;
                            if (_t.isLoading) {
                                return;
                            }

                            var h = (_t.readerDiv.scrollHeight - _t.readerDiv.offsetHeight);
                            //almost bottom load more
                            if ((st > lastScrollTop) && (_t.readerDiv.scrollTop + _t.bounceHeight ) >= h && (!this.isLoadOver)) {

                                _t.loadMoreParagrames(ScrollDirection.Down, _t.bottomBatchNum + 1);

                            }
                            // almost top
                            if ((st < lastScrollTop) && ( _t.readerDiv.scrollTop <= _t.bounceHeight) && _t.topBatchNum > 1) {

                                _t.loadMoreParagrames(ScrollDirection.Up, _t.topBatchNum - 1);

                            }
                            lastScrollTop = _t.readerDiv.scrollTop;

                        }));
                        _t.readerDiv.scrollTop = 1900;

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

    saveReadingPosition() {
        var pos = this.readerDiv.getBoundingClientRect();
        console.log(pos.top);
        var pps = this.readerDiv.querySelectorAll('.canvas-reader__p');

        var f = null;
        _.find(pps, p => {

            if ((p.getBoundingClientRect().bottom > pos.top)) {
                f = p;
                return true;
            }
        });
        var ws = f.querySelectorAll('.canvas-reader__p_el');

        var posWord = null;
        _.find(ws, w => {

            if ((w.getBoundingClientRect().bottom > pos.top)) {
                posWord = w;
                return true;
            }
        });
        //得到当前阅读视野的第一个单词
        console.log(posWord.innerText);
        posWord.scrollIntoView();

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


    @action
    tabChange(tab){
        this.sideTab =tab;
        this.props.global.setIsFoldLeftSideOfRead(false);
    }
    @observable sideTab :string = 'Chapter'
    renderSideOfOperation() {

        var sides=this.props.global.isFoldLeftSideOfRead?'':<div key='sides' >
            {
                this.sideTab==='Chapter'?<ul className='read__side-chapters'>
                    {
                        (this.book && this.book.chapters) ? this.book.chapters.map((c) => {
                            return <li key={c._id}>
                                {c.title}
                            </li>;
                        }) : ''
                    }
                </ul>:''

            }
            {
                this.sideTab ==='Info'? <div>
                    {this.book && this.book.intro}
                </div>:''
            }
        </div>


        return [
            <ReadTabs key='s1' isFold={this.props.global.isFoldLeftSideOfRead} defaultTab={this.sideTab} tabChange={this.tabChange.bind(this)}/>,
            sides,
            <div key='read__footer' className='read__side-footer' onClick={e=>this.props.global.setIsFoldLeftSideOfRead(!this.props.global.isFoldLeftSideOfRead)}>
                {this.props.global.isFoldLeftSideOfRead?<ArrowRightIcon/>:<ArrowLeftIcon/>}
            </div>
        ];
    }

    closeSideOfHelp() {
        reading.setCurrent('',);
    }

    renderSideOfHelp() {
        // var viewMode = reading.currentCommit._id?ViewMode.view
        //todo 有空研究下 为啥不能直接写在元素里边 onClick={()=>reading.setViewMode(ViewMode.edit)}
        var other = {
            onClick: () => reading.setViewMode(ViewMode.edit)
        };

        if (!reading.currentCommit.text) {
            return '';
        }
        return <div className='read-help'>
            <div className='read-help__top'>
                <span onClick={this.closeSideOfHelp.bind(this)}><ArrowRightIcon></ArrowRightIcon></span>

            </div>

            <div className='read-help__ref'>{reading.currentCommit.text}</div>


            <div className='read-help__remarks'>
                <ul>
                    {reading.currentCommit.relatedRemarks ? reading.currentCommit.relatedRemarks.map(r =>
                        <li key={r._id}>
                            <div className='read-help__remarks-title'>{r.text}</div>
                            <div dangerouslySetInnerHTML={{__html: r.remark}}></div>
                        </li>
                    ) : ''
                    }
                </ul>

            </div>
            {/*onClick={()=>reading.setViewMode(ViewMode.edit)}*/}
            <div className='read-help__editor'>
                {
                    reading.viewMode === ViewMode.view ?
                        <Card {...other} style={{width: 300}}><p
                            dangerouslySetInnerHTML={{__html: reading.currentCommit.remark}}></p>
                        </Card> :
                        <div>

                            <MoliEditor
                                value={reading.currentCommit.remark}
                                onChange={(html) => reading.setCurrentRemark(html)}></MoliEditor>

                            <Button type="primary" onClick={this.saveCommit.bind(this)}
                                    htmlType="submit">save</Button>
                        </div>
                }
            </div>


        </div>;


    }

    @action
    modeChange(m) {
        this.mode = m;
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


        const loadMoreContent = <div>
            {this.isLoading ? <Spin/> : ''}
        </div>;

        const readDivClasses = classnames('canvas-reader', {
            'canvas-reader--noscroll': this.isLoading
        });

        const read__sideClasses =classnames('row-layout__side','read__side',{
            'read__side--fold':this.props.global.isFoldLeftSideOfRead
        });

        return (

            <Provider reading={reading}>


                <div className='row-layout read noselect'>


                    {this.renderSideOfHelp()}

                    <div className={read__sideClasses}>
                        {this.renderSideOfOperation()}

                    </div>
                    <div className='row-layout__content'>
                        <ReadTools mode={this.mode}
                                   modeChange={this.modeChange.bind(this)}
                                   className='read__tools'
                                   pre={this.Pre.bind(this)}
                                   next={this.Next.bind(this)}
                                   savePosition={this.saveReadingPosition.bind(this)}
                        />

                        <div className='read__title'>
                            {this.book.cn_name}&nbsp;{this.book.en_name}
                        </div>

                        <div className='read__subtitle'>
                            <div>{this.isLoading + ''}</div>
                            <div>{this.topBatchNum + '---' + this.bottomBatchNum + '[批次]' + this.maxBatchs} </div>

                        </div>
                        <div className='read__content'>


                            <div ref={readerDiv => this.readerDiv = readerDiv} className={readDivClasses}>
                                {blocks}
                                {loadMoreContent}
                            </div>
                        </div>


                    </div>

                </div>

            </Provider>



        );
    }


}