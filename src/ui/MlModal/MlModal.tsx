import './MlModal.scss';
import * as React from 'react';


import {observer, Provider} from 'mobx-react';

import Modal from 'react-modal';

import classnames from 'classnames';

export default class MlModal extends React.Component {


    async componentDidMount() {


    }

    props: any


    // children:any
    // className?:string
    // title?:string
    //    closeModal: Function


    render() {


        return (
            <div className='ml-modal'>

                <Modal
                    {...this.props}
                    className={classnames('ml-modal__modal', this.props.className)}
                >
                    <div className='ml-modal__title'>{this.props.title}</div>
                    <span onClick={this.props.closeModal.bind(this)} className='ml-modal__close'>关闭</span>

                    {this.props.children}
                </Modal>
            </div>

        );
    }


}


