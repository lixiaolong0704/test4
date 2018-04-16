import './MlModal.scss';
import * as React from 'react';

import CloseIcon from './icon-close.svg';
import {observer, Provider} from 'mobx-react';

import Modal from 'react-modal';

import classnames from 'classnames';
import Button from '../Button/Button';

var nFun = () => {
};

export default class MlModal extends React.Component {

    static defaultProps = {
        saveModal: nFun,
        closeModal: nFun,
        overlayClassName: 'ml-modal__overlay'
    };

    async componentDidMount() {

    }

    props: any | {
        children: any
        className?: string
        title?: string
        closeModal: Function,
        saveModal: Function

    };


    renderFooter() {

        return <div className='ml-modal__footer'>
            <Button onClick={this.props.closeModal.bind(this)} type='light'>取消</Button>
            <Button onClick={this.props.saveModal.bind(this)}>保存</Button>
        </div>;
    }

    render() {


        return (
            <div className='ml-modal'>

                <Modal
                    {...this.props}
                    className={classnames('ml-modal__modal', this.props.className)}
                >
                    <div className='ml-modal__title'>{this.props.title}</div>
                    <span onClick={this.props.closeModal.bind(this)} className='ml-modal__close'><CloseIcon></CloseIcon></span>


                    {this.props.children}
                    {this.renderFooter()}


                </Modal>
            </div>

        );
    }


}



