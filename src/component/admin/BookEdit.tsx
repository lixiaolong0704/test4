import './BookEdit.scss';
import * as React from 'react';

import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import api from '../../api';


import {MRForm, Button, Input, MlModal} from 'ui/index';


@observer
class BookEdit extends React.Component {

    constructor(props) {
        super(props)
        this.form = new MRForm({
            fields: {
                "cn_name": {
                    label: '中文名',
                    rules: 'required|string|between:5,200'
                },
                "en_name": {
                    label: '英文名',
                    rules: 'required|string|between:5,200'
                },
                "intro":{
                        label: '简介',
                        rules: 'required|string|between:5,500',
                },
                "dynamicFields": {}
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
            this.getBookInfo(nextProps.bookId);
        }
    }

    async getBookInfo(bookId) {
        if (bookId) {
            let rst = await api.get(`/book/getBookById/${bookId}`);
            if (rst.code === 1) {
                runInAction(() => {
                    this.book = rst.data;

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
        let rst = await api.post(`/book/addBook`, params);
        if (rst.code === 1) {
            runInAction(() => {
                this.isLoading = false;
            });
            this.props.closeModal(params);
        }

    }

    index = 0;

    addParagraph() {
        var dynamicFields = this.form.$('dynamicFields');
        var item = "p" + this.index;
        // dynamicFields.add(item);
        dynamicFields.add('', { key: item });
        dynamicFields.$(item).set('placeholder', item);
        dynamicFields.$(item).set('rules', 'required|string|between:1,200');
        // dynamicFields.$(item).set('bindings', 'Input');
        this.index++;
    }

    render() {

        var dynamicFields = this.form.$('dynamicFields');

        return (
            <div className='book-edit'>


                <MlModal
                    isOpen={this.props.modalIsOpen}
                    onAfterOpen={this.afterOpenModal.bind(this)}
                    title="编辑书籍"
                    className="book-edit__modal"
                    closeModal={this.props.closeModal.bind(this)}
                    saveModal={this.form.onSubmit}
                >
                    <form className='book-edit__form' onSubmit={this.form.onSubmit}>

                        <Input field={this.form.$('cn_name')}/>
                        <Input field={this.form.$('en_name')}/>
                        <Input field={this.form.$('intro')} type='textarea' rows={3}/>

                        {dynamicFields.map(field =>
                            <Input
                                key={field.name}
                                field={field}
                            />,
                        )}

                        <a onClick={this.addParagraph.bind(this)}>段落+</a>
                    </form>
                </MlModal>
            </div>

        );
    }


}


export default BookEdit;