import './BookEdit.scss';
import * as React from 'react';

import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import api from '../../api';


import {MRForm, Button, Input, MlModal, Icon, PerfectScrollbar} from 'ui/index';
import _ from 'lodash';


@observer
class BookEdit extends React.Component {

    constructor(props) {
        super(props);
        this.form = new MRForm({
            fields: {
                'cn_name': {
                    label: '中文名',
                    rules: 'required|string|between:5,200'
                },
                'en_name': {
                    label: '英文名',
                    rules: 'required|string|between:5,200'
                },
                'intro': {
                    label: '简介',
                    rules: 'required|string|between:5,500',
                },
                'chapters':{},
                'chapters[]': {

                }
            },
            onSuccess: this.onSuccess.bind(this)
        });
    }

    props: {
        modalIsOpen: boolean,
        closeModal: Function,
        bookId?: string
    };
    form: any = null;
    @observable book?: any = {};

    componentWillReceiveProps(nextProps) {
        if ((this.props.modalIsOpen !== nextProps.modalIsOpen) && nextProps.modalIsOpen) {
            this.form.showErrors(false);
            this.getBookInfo(nextProps.bookId);
        }
    }

    setValue(key) {
        this.form.$(key).set('value', this.book[key]);
    }

    async getBookInfo(bookId) {
        if (bookId) {
            let rst = await api.get(`/book/getBookById/${bookId}`);
            if (rst.code === 1) {
                runInAction(() => {
                    this.book = rst.data;
                    this.setValue('cn_name');
                    this.setValue('en_name');
                    this.setValue('intro');

                    var $chapters = this.form.$('chapters');
                    $chapters.map((f, index) => {
                        $chapters.del(f.name);
                    });
                    _.map(this.book.chapters, (c) => {
                        this.addBind($chapters, c._id, {
                            placeholder: '',
                            rules: 'required|string|between:1,200',
                            value: c.title,
                            label: '',
                            extra: c._id

                        });
                    });


                });


            }
        }
    }

    async componentDidMount() {


    }


    afterOpenModal() {
        // references are now sync'd and can be accessed.

    }


    @observable isLoading: boolean = false;

    async onSuccess(params) {
        this.isLoading = true;
        var ps = _.cloneDeep(params);
        var $chapters = this.form.$('chapters');
        ps.chapters = [];
        _.mapValues(params.chapters, (v, key) => {
            var extra = $chapters.$(key).get('extra');
            ps.chapters.push({
                title: v,
                _id: extra?extra:undefined
            });
        });


        let rst = await api.post(`/book/addBook`, ps);
        if (rst.code === 1) {
            runInAction(() => {
                this.isLoading = false;
            });
            this.props.closeModal(ps);
        }

    }


    addParagraph() {
        var dynamicFields = this.form.$('chapters');
        var item = 'p' + parseInt(Math.random() * 1000 + '');
        this.addBind(dynamicFields, item, {
            placeholder: '',
            rules: 'required|string|between:1,200',
            value: '',
            label: ''

        });

    }


    removeLast() {
        var dynamicFields = this.form.$('chapters');
        var size = dynamicFields.size;
        dynamicFields.map((f, index) => {
            if (index === (size - 1)) {
                dynamicFields.del(f.name);
                // _.remove(dynamicFields.fields,o=>true)
            }
        });
        // _.map(dynamicFields,(field)=>{
        //
        //     console.log(field);
        // });

    }

    addBind(df, key, config: object) {
        df.add(key, {key: key});
        var sub = df.$(key);
        _.mapValues(config, (v, key) => {
            sub.set(key, v);

        });
    }

    renderChapters() {
        var chapters = this.form.$('chapters');
        return <div className='book-chapters'>
            <label>章节</label>
            <Icon onClick={this.addParagraph.bind(this)} svgId='add_v1'></Icon>
            <Icon onClick={this.removeLast.bind(this)} svgId='delete_v1'></Icon>
            <div className='book-chapters__content'>
                {chapters.map(field =>
                    <Input
                        key={field.name}
                        field={field}
                    />,
                )}

            </div>

        </div>;
    }

    render() {


        return (
            <div className='book-edit'>


                <MlModal
                    isOpen={this.props.modalIsOpen}
                    onAfterOpen={this.afterOpenModal.bind(this)}
                    title="编辑书籍"
                    className="book-edit__modal"
                    closeModal={this.props.closeModal.bind(this)}
                    saveModal={this.form.onSubmit}
                    enableScollbar={true}
                >
                    <form className='book-edit__form' onSubmit={this.form.onSubmit}>

                        <Input field={this.form.$('cn_name')}/>
                        <Input field={this.form.$('en_name')}/>
                        <Input field={this.form.$('intro')} type='textarea' rows={3}/>
                        {this.renderChapters()}
                    </form>
                </MlModal>
            </div>

        );
    }


}


export default BookEdit;