import './Book.scss';
import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import * as React from 'react';
import api from '../../../api';
import {Scrollbars} from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';
import {PerfectScrollbar} from 'ui/index';

@observer
export default class Book extends React.Component {

    @observable items: any = [];

    @observable hasMoreItems = true; //'=不要写成:'

    @observable b = null;
    ps: any = null;

    async componentDidMount() {
        this.loadData(1);
    }

    @action
    async loadData(page) {
        console.log('..........');
        var _t = this;
        let rst = await api.get(`/book/getBooksOfPg/${page}`);
        if (rst.code === 1) {
            runInAction(() => {
                rst.data.docs.map((item) => {
                    this.items.push(item);
                });

                if (rst.data.docs.length === rst.data.limit) {
                    this.hasMoreItems = true;
                } else {
                    this.hasMoreItems = false;
                }
                this.ps.init();
            });

        }
    }

    renderBookCard(d) {

        return <div className='book-list__item' key={d._id}>
            <img src={'https://i0.ebkimg.com/previews/095/095949/095949935/095949935-sml-1.jpg'}/>
            <div className='book-list__cname'><NavLink target="_blank" to={`/read/${d._id}`}>{d.cn_name}</NavLink></div>
        </div>;
    }

    render() {


        return (
            <PerfectScrollbar className='book' ref={ps=> this.ps= ps}>
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={1}
                    loadMore={this.loadData.bind(this)}
                    hasMore={this.hasMoreItems}
                    useWindow={false}
                    threshold={100}
                >
                    <div className='book-banner'>

                    </div>
                    <div className='book-tabs'>
                        <div className='book-tabs__tab' ref={s => this.b = s}>
                            最新推荐

                        </div>
                    </div>


                    <div className="book-list">

                        {
                            this.items && this.items.length > 0 ? this.items.map(d => this.renderBookCard(d)) :
                                <div></div>
                        }
                        {(!this.hasMoreItems) ? <div className='book-list__nomore'>别扯了，到底了</div> : ''}
                    </div>


                </InfiniteScroll>
            </PerfectScrollbar>
        );
    }


}