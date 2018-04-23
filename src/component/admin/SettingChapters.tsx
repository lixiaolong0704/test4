import './SettingChapters.scss';
import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import * as React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import {MRForm, Button, Input, MlModal, Icon, PerfectScrollbar} from 'ui/index';
import api from '../../api';
import Paragraph from './SettingChapters/Paragraph';
import BgScSetting from './SettingChapters/BgScSetting';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@observer
export default class SettingChapters extends React.Component {

    props: {
        closeModal: Function,
        bookId?: string
    };

    async componentDidMount() {

        let rst = await api.get(`/book/getBookById/${this.props.bookId}`);
        if (rst.code === 1) {
            runInAction(() => {
                this.book = rst.data;


            });


        }

    }

    componentWillUnmount() {

    }

    handleChange(chapterId: any) {
        console.log(chapterId);

    }

    @observable book?: any = {};

    @observable paragraphs: Array<any> = [];


    @action
    async query() {
        let prst = await api.get(`/book/getBookParagraphsOfPg/${this.props.bookId}/1/${  this.condition}`);
        if (prst.code === 1) {
            runInAction(() => {
                console.log(prst.data);

                this.paragraphs = (prst.data && prst.data[0]) ? prst.data[0].paragraphs : [];
            });


        }
    }

    @observable condition = '';

    @action
    onChange(e) {
        this.condition = e.target.value;
    }

    @action
    onDrop(targetProps, monitor) {

        console.log(targetProps.chapterId);
        if (monitor) {
            const pid = monitor.getItem().pid;
            console.log(pid);
        }
    }

    renderScSettings(c) {

        //chapterId此处错了，target对应的chapterId


        return <BgScSetting chapterId={c._id} onDrop={this.onDrop.bind(this)}>

        </BgScSetting>;

    }


    render() {


        const Bg = DragDropContext(HTML5Backend)(observer(() => {

            return <div className='setting-chapters__content'>
                <PerfectScrollbar className='setting-chapters__chapters'>
                    {
                        this.book && this.book.chapters ? this.book.chapters.map(c => <li key={c._id}>
                            <span className='setting-chapters__chapter'>{c.title}</span>
                            {this.renderScSettings(c)}
                        </li>) : ''
                    }
                </PerfectScrollbar>

                <div className='setting-chapters__paragraphs'>

                    <Input onChange={this.onChange.bind(this)} value={this.condition}/><Button
                    onClick={this.query.bind(this)}>查询</Button>
                    <PerfectScrollbar className='setting-chapters__searched'>

                        {
                            this.paragraphs ? this.paragraphs.map(c => <Paragraph key={c._id} pid={c._id}
                            >
                                {c.en_content}
                            </Paragraph>) : ''
                        }
                    </PerfectScrollbar>

                </div>
            </div>;


        }));


        return (
            <div className='setting-chapters'>
                <MlModal
                    isOpen={true}
                    title="设置段落"
                    className="setting-chapters__modal"
                    closeModal={this.props.closeModal.bind(this)}
                    enableScollbar={false}
                >
                    <Bg/>
                </MlModal>
            </div>

        );
    }


}