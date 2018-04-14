import './Home.scss';
import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import * as React from 'react';
import api from '../../../api';
import {Scrollbars} from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';
import PerfectScrollbar from 'perfect-scrollbar';

@observer
export default class Home extends React.Component {


    async componentDidMount() {

    }


    render() {


        return (
            <div className='home'>

                <div className='home__group'>
                    <div className='home__title'>关于Moliabc问题:</div>
                    <ul className='home__intro'>
                        <li>功能简介</li>
                        <li>怎么使用</li>
                        <li>我想读小说</li>
                        <li>我想记单词</li>

                    </ul>

                </div>

                <div className='home__articles'>
                    <ul>
                        <li><a target='_blank' href='https://zhuanlan.zhihu.com/p/35163164'>AnKindle：生词导入从未如此轻松</a></li>
                        <li><a target='_blank' href='https://www.zhihu.com/question/19566985'>有哪些提高英语听力的经验和诀窍？</a></li>
                        <li><a target='_blank' href='https://zhuanlan.zhihu.com/p/33635149'>如何直接从 Kindle 上导出电子书标注和笔记</a></li>
                        <li><a target='_blank' href='https://zhuanlan.zhihu.com/p/31816676'>如何观看、下载任何Youtube和可汗学院视频音频，并变成可“发音查词”电子书？</a></li>
                        <li><a target='_blank' href='https://zhuanlan.zhihu.com/p/31227373'>找老外免费学英语，只需这2招！</a></li>


                        <li><a target='_blank' href='https://www.zhihu.com/question/20097263'>怎么练好英语口语？</a></li>
                        <li><a target='_blank' href='https://www.zhihu.com/question/22394845'>怎样出色完成 1 分钟左右的英语自我介绍？</a></li>
                        <li><a target='_blank' href='https://www.zhihu.com/question/27702564'>每天坚持英语学习为什么还是学不好?</a></li>
                        <li><a target='_blank' href='https://www.zhihu.com/question/37174334'>在中国，英语流利能给个人带来多少额外的收益？</a></li>

                    </ul>


                </div>

                <div className='home__resources'>
                    <ul>
                        <li><a target='_blank' href='https://zhuanlan.zhihu.com/p/35163164'>AnKindle：生词导入从未如此轻松</a></li>
                        <li><a target='_blank' href='https://www.zhihu.com/question/19566985'>有哪些提高英语听力的经验和诀窍？</a></li>
                        <li><a target='_blank' href='https://zhuanlan.zhihu.com/p/33635149'>如何直接从 Kindle 上导出电子书标注和笔记</a></li>
                        <li><a target='_blank' href='https://zhuanlan.zhihu.com/p/31816676'>如何观看、下载任何Youtube和可汗学院视频音频，并变成可“发音查词”电子书？</a></li>
                        <li><a target='_blank' href='https://zhuanlan.zhihu.com/p/31227373'>找老外免费学英语，只需这2招！</a></li>


                        <li><a target='_blank' href='https://www.zhihu.com/question/20097263'>怎么练好英语口语？</a></li>
                        <li><a target='_blank' href='https://www.zhihu.com/question/22394845'>怎样出色完成 1 分钟左右的英语自我介绍？</a></li>
                        <li><a target='_blank' href='https://www.zhihu.com/question/27702564'>每天坚持英语学习为什么还是学不好?</a></li>
                        <li><a target='_blank' href='https://www.zhihu.com/question/37174334'>在中国，英语流利能给个人带来多少额外的收益？</a></li>

                    </ul>


                </div>
            </div>
        );
    }


}