import './Book.scss';
import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import * as React from 'react';
import api from '../../../api';
import {Scrollbars} from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';
// import InfiniteScroll from '../../ui/InfiniteScroll.js'
// import InfiniteScroll from 'react-infinite-scroll-component';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

@observer
export default class Book extends React.Component {

    @observable items: any = [];

    @observable hasMoreItems = true; //'=不要写成:'

    @observable sbar:any = null;
    @observable b =null;
    @observable txt :string ='';
    ps:any = null;
    @action
    setup(){
        this.txt='     Since originally writing this post a number of reports have come out to indicate that for the most part, using Data URIs in CSS is actually a render blocking anti-pattern (basically it will make your page seem slower, not faster, particularly on mobile). Therefore unless you know exactly what you are doing with them and what you want to achieve, tread carefully. I’ve left the post here as it was in case any of it has tangentially useful information.\n' +
            '                        '

        setTimeout(()=>{
            this.ps = new PerfectScrollbar(this.b, {
                wheelPropagation: true,
                suppressScrollX:true,
                minScrollbarLength: 20
            });
        })

    }
    async componentDidMount() {


        setTimeout(this.setup.bind(this),1)

        this.loadData(1);
    }

    @action
    async loadData(page) {
        console.log('..........');
        var _t=this;
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

                setTimeout(() => {
                    this.ps = new PerfectScrollbar(this.sbar, {
                        wheelPropagation: true,
                        suppressScrollX:true,
                        minScrollbarLength: 20
                    });
                    _t.ps.update();

                });

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
            <div className='book'>

                <div className='book-banner'>

                </div>
                <div className='book-tabs'>
                    <div className='book-tabs__tab' ref={ s=> this.b =s} >
                        最新推荐
                        <div>
                            {this.txt}
                       </div>
                    </div>
                </div>


                <div className='book-listcontainer' ref={(sbar) => this.sbar = sbar}  >
                    {/*<InfiniteScroll*/}
                        {/*initialLoad={false}*/}
                        {/*pageStart={1}*/}
                        {/*loadMore={this.loadData.bind(this)}*/}
                        {/*hasMore={this.hasMoreItems}*/}
                        {/*useWindow={false}*/}
                        {/*threshold={100}*/}
                    {/*>*/}

                        <div className="book-list">

                            {
                                this.items && this.items.length > 0 ? this.items.map(d => this.renderBookCard(d)) :
                                    <div></div>
                            }
                            {(!this.hasMoreItems) ? <div className='book-list__nomore'>别扯了，到底了</div> : ''}
                        </div>
                    {/*</InfiniteScroll>*/}
                </div>


            </div>
        );
    }


}