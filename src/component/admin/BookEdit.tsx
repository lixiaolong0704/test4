import './BookEdit.scss';
import * as React from 'react';

import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import api from '../../api';


import {MRForm, Button, Input, MlModal} from 'ui/index';


@observer
class BookEdit extends React.Component {


    props: {
        modalIsOpen: boolean,
        closeModal: Function,
        bookId?: string
    };

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

    render() {


        const form: any = new MRForm({
            fields: [
                {
                    value: this.book.cn_name,
                    name: 'cn_name',
                    label: '中文名',
                    rules: 'required|string|between:5,200',
                },
                {
                    value: this.book.en_name,
                    name: 'en_name',
                    label: '英文名',
                    rules: 'required|string|between:5,200',
                },
                {
                    value: this.book.intro,
                    name: 'intro',
                    label: '简介',
                    rules: 'required|string|between:5,500',
                }
            ],
            onSuccess: this.onSuccess.bind(this)
        });
        return (
            <div className='book-edit'>


                <MlModal
                    isOpen={this.props.modalIsOpen}
                    onAfterOpen={this.afterOpenModal.bind(this)}
                    title="编辑书籍"
                    className="book-edit__modal"
                    closeModal={this.props.closeModal.bind(this)}
                    saveModal={form.onSubmit}
                >
                    <form className='book-edit__form' onSubmit={form.onSubmit}>

                        <Input field={form.$('cn_name')}/>
                        <Input field={form.$('en_name')}/>
                        <Input field={form.$('intro')} type='textarea' rows={3}/>

                    </form>
                </MlModal>
            </div>

        );
    }


}


export default BookEdit;