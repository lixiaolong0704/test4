import './BookEdit.scss';
import * as React from 'react';

import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import api from '../../api';


import {MRForm, Button, Input, MlModal} from 'ui/index';

class BookEditForm extends MRForm {
    setup() {
        return {
            fields: [
                {
                    name: 'cn_name',
                    label: '中文名',
                    placeholder: 'Insert Email',
                    rules: 'required|string|between:5,25',
                },
                {
                    name: 'en_name',
                    label: '英文名',
                    placeholder: 'Insert Email',
                    rules: 'required|string|between:5,25',
                },
                {
                    name: 'intro',
                    label: '简介',
                    placeholder: 'Insert Email',
                    rules: 'required|string|between:5,25',
                },
                {
                    name: 'email',
                    label: 'Email',
                    placeholder: 'Insert Email',
                    rules: 'required|email|string|between:5,25',
                }
            ]
        };
    }

}

@observer
class BookEdit extends React.Component {


    props: {
        modalIsOpen: boolean,
        closeModal: Function
    }


    async componentDidMount() {


    }


    afterOpenModal() {
        // references are now sync'd and can be accessed.

    }


    render() {


        const form: any = new BookEditForm();
        return (
            <div className='book-edit'>

                <MlModal
                    isOpen={this.props.modalIsOpen}
                    onAfterOpen={this.afterOpenModal.bind(this)}
                    title="Example Modal"
                    className="book-edit__modal"
                    closeModal={this.props.closeModal.bind(this)}
                >
                    <form className='form' onSubmit={form.onSubmit}>


                        <Input field={form.$('cn_name')}/>
                        <Input field={form.$('en_name')}/>
                        <Input field={form.$('intro')} type='textarea' rows={3}/>
                        <Input field={form.$('email')}/>
                        <Button onClick={form.onSubmit}>提交</Button>

                    </form>
                </MlModal>
            </div>

        );
    }


}


export default BookEdit;