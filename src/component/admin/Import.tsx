import './Import.scss';
import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import * as React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';

import {MRForm, Button, Input, MlModal, Icon, PerfectScrollbar} from 'ui/index';
import _ from 'lodash';
import Upload from 'rc-upload';

const style = `
        .rc-upload-disabled {
           opacity:0.5;
        `;
@observer
export default class Import extends React.Component {


    constructor(props) {
        super(props);


    }

    componentWillUnmount() {

    };

    async componentDidMount() {

    }

    uploaderProps: any;
    props: {
        modalIsOpen: boolean,
        closeModal: Function,
        bookId?: string
    };

    saveModal(e) {


    }

    render() {


        this.uploaderProps = {
            action: 'http://localhost:4000/book/upload/' + this.props.bookId,
            data: {book_id: this.props.bookId, b: 2},
            headers: {
                Authorization: 'xxxxxxx',
            },
            withCredentials: true,
            multiple: true,
            beforeUpload(file) {
                console.log('beforeUpload', file.name);
            },
            onStart: (file) => {
                console.log('onStart', file.name);
                // this.refs.inner.abort(file);
            },
            onSuccess(file) {
                console.log('onSuccess', file);
            },
            onProgress(step, file) {
                console.log('onProgress', Math.round(step.percent), file.name);
            },
            onError(err) {
                console.log('onError', err);
            },
        };

        return (
            <div className='import'>


                <MlModal
                    isOpen={this.props.modalIsOpen}
                    title="导入"
                    className="book-edit__modal"
                    closeModal={this.props.closeModal.bind(this)}
                    saveModal={this.saveModal.bind(this)}
                    enableScollbar={true}
                >
                    <form className='import__form'>


                            <p>上传段落文件（.txt)</p>

                            <div>
                                <Upload {...this.uploaderProps} ref="inner"><a className='import__updatebtn'>开始上传</a></Upload>
                            </div>




                    </form>
                </MlModal>
            </div>
        );
    }


}