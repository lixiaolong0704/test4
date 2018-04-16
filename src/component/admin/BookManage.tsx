import {Table, Spin} from 'antd';
import './BookManage.scss';


import * as React from 'react';

import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import api from '../../api';
import {NavLink} from 'react-router-dom';
import BookEdit from './BookEdit';
import {Button} from 'ui/index';
//
//
import EditIcon from 'assets/svg/edit.svg';
import DeleteIcon from 'assets/svg/delete.svg';



import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
@observer
export default class BookManage extends React.Component {

    props: {
        location?: any,
        histroy?: any
    };
    @observable data: any = {docs: []};
    @observable isLoading: boolean = false;
    @observable isShowEdit: boolean = true;

    @observable current = 1;
    @observable currentBookId =null;
    pageSize=15;


    // @observable page:number=1;


    async componentDidMount() {
        // :page
        this.loadData(this.current);
    }

    @action
    async loadData(page, callback?) {
        var _t = this;
        let rst = await api.get(`/book/getBooksOfPg/${page}/${this.pageSize}`);
        if (rst.code === 1) {
            runInAction(() => {
                _t.data = rst.data;
                // this.props.histroy.push(``);

                callback && callback();

            });


        }
    }


    @action
    async importBook() {
        this.isLoading = true;
        let rst = await api.post(`/book/addBook`);

        if (rst.code === 1) {
            runInAction(() => {
                this.isLoading = false;
            });
            this.loadData(1);


        }

    }


    @action
    onChange(page) {
        this.current = page;
        this.loadData(this.current, () => {

        });
    }

    @action
    async showEdit(book_id?) {
        this.isShowEdit = true;
        this.currentBookId = book_id;
    }

    @action
    onCloseEdit(isUpdate) {
        this.isShowEdit = false;
        if(isUpdate){
            this.current=1;
            this.loadData(this.current);

        }
    }

    render() {




        var books = this.data.docs.map(d => d);

        return (
            <div className='book-manage'>
                <DeleteIcon></DeleteIcon>
                <BookEdit modalIsOpen={this.isShowEdit} bookId={this.currentBookId} closeModal={this.onCloseEdit.bind(this)}></BookEdit>
                <div className='book-manage__operation'>
                    <Button onClick={e=>this.showEdit()} type="primary">新增</Button>
                    <Button onClick={this.importBook.bind(this)} type="primary">导入书籍</Button>
                </div>

                <div>
                    {this.isLoading ? <Spin/> : ''}

                    <table className='ml-table'>
                        <thead>
                        <tr>
                            <td>书名</td>
                            <td></td>
                            <td>时间</td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map(b => <tr key={b._id}>

                            <td><NavLink target="_blank" to={`/read/${b._id}`}>{b.cn_name}</NavLink></td>
                            <td>{b.en_name}</td>
                            <td>{b.create_time}</td>
                            <td>
                                <span onClick={e=>this.showEdit(b._id)}>
                                    <EditIcon></EditIcon>
                                </span>
                                <span><DeleteIcon></DeleteIcon></span>
                            </td>
                        </tr>)}
                        </tbody>


                    </table>

                    <div className='book-manage__pagination'>
                        <Pagination className='ml-pagination' onChange={this.onChange.bind(this)} current={this.current} pageSize={this.pageSize} total={this.data.total}   />

                    </div>

                    {/*<Table rowKey="_id" columns={columns} pagination={pageConfig} dataSource={dataSource} size="small"/>*/}
                </div>


            </div>
        );
    }


}