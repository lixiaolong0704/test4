import {Input} from 'ui/index';
import './BookEdit.scss';


import * as React from 'react';

import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import api from '../../api';

import Modal from 'react-modal';

@observer
class BookEdit extends React.Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    props: {
        modalIsOpen: boolean,
        closeModal: Function
    }

    // @observable page:number=1;


    async componentDidMount() {


    }


    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.

    }

    closeModal(e) {
        this.props.closeModal(e);
    }

    render() {




        // const WrappedRegistrationForm = Form.create()(RegistrationForm);
        return (
            <div>

                <Modal
                    isOpen={this.props.modalIsOpen}
                    onAfterOpen={this.afterOpenModal.bind(this)}
                    contentLabel="Example Modal"
                >
                    <button onClick={this.closeModal.bind(this)}>close</button>
                    <div>I am a modal</div>
                    <form>
                        <Input />

                    </form>
                </Modal>
            </div>

        );
    }


}


export default BookEdit;