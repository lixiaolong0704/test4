import './SettingChapters.scss';
import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import * as React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import {MRForm, Button, Input, MlModal, Icon, PerfectScrollbar} from 'ui/index';
import api from '../../api';

@observer
export default class SettingChapters extends React.Component {


    async componentDidMount() {

        let rst = await api.get(`/book/getBookById/${this.props.bookId}`);
        if (rst.code === 1) {
            runInAction(() => {
                this.book = rst.data;


            });


        }


    }

    @observable book?: any = {};

    @observable paragraphs: Array<any> = [];
    props: {
        closeModal: Function,
        bookId?: string
    };

    @action
    async query() {
        let prst = await api.get(`/book/getBookParagraphsOfPg/${this.props.bookId}/1/${  this.condition}`);
        if (prst.code === 1) {
            runInAction(() => {
                console.log(prst.data)

                this.paragraphs = prst.data ? prst.data.paragraphs : [];
            });


        }
    }

    @observable condition = '';

    @action
    onChange(e) {
        this.condition = e.target.value;
    }

    render() {


        return (
            <div className='setting-chapters'>
                <MlModal
                    isOpen={true}
                    title="设置段落"
                    className="setting-chapters__modal"
                    closeModal={this.props.closeModal.bind(this)}
                    enableScollbar={true}
                >

                    <div className='setting-chapters__content'>
                        <PerfectScrollbar className='setting-chapters__chapters'>
                            {
                                this.book && this.book.chapters ? this.book.chapters.map(c => <li key={c._id}>
                                    {c.title}
                                </li>) : ''
                            }
                        </PerfectScrollbar>

                        <div className='setting-chapters__paragraphs'>

                            <Input onChange={this.onChange.bind(this)} value={this.condition}/><Button
                            onClick={this.query.bind(this)}>查询</Button>
                            <ul>
                                {
                                    this.paragraphs ? this.paragraphs.map(c => <li key={c._id}>
                                        {c.en_content}
                                    </li>) : ''
                                }
                            </ul>

                        </div>
                    </div>
                </MlModal>
            </div>

        );
    }


}