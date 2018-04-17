import './MlModal.scss';
import * as React from 'react';

import CloseIcon from './icon-close.svg';
import {observer, Provider} from 'mobx-react';

import Modal from 'react-modal';

import classnames from 'classnames';
import Button from '../Button/Button';

import PerfectScrollbar from 'perfect-scrollbar';

var nFun = () => {
};

export default class MlModal extends React.Component {

    static defaultProps = {
        saveModal: nFun,
        closeModal: nFun,
        overlayClassName: 'ml-modal__overlay'
    };
    sbar: any;
    ps: any;

    constructor(p) {
        super(p);
        this.sbar = React.createRef();

    }

    componentDidMount() {

    }

    props: any | {
        children: any
        className?: string
        title?: string
        closeModal: Function,
        saveModal: Function
        enableScollbar:boolean

    };

    onAfterOpen(){
        if(this.props.enableScollbar) {
            this.ps = new PerfectScrollbar(this.sbar.current, {
                wheelPropagation: true,
                suppressScrollX: true,
                minScrollbarLength: 20
            });
        }
    }
    renderFooter() {

        return <div className='ml-modal__footer'>
            <Button onClick={this.props.closeModal.bind(this)} type='light'>取消</Button>
            <Button onClick={this.props.saveModal.bind(this)}>保存</Button>
        </div>;
    }

    render() {


        return (
            <div className='ml-modal' >

                <Modal
                    {...this.props}
                    className={classnames('ml-modal__modal', this.props.className)}
                    onAfterOpen={this.onAfterOpen.bind(this)}
                >
                    <div className='ml-modal__title'>{this.props.title}</div>
                    <span onClick={this.props.closeModal.bind(this)} className='ml-modal__close'><CloseIcon></CloseIcon></span>
                    <div className='ml-modal__content' ref={this.sbar}>
                        {React.Children.only(this.props.children)}
                    </div>

                    {this.renderFooter()}


                </Modal>
            </div>

        );
    }


}



