import {Table, Spin, Button} from 'antd';
import * as React from 'react';

import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import api from '../../api';
import {NavLink} from 'react-router-dom';
import BookEdit from './BookEdit';

@observer
export default class BookManage extends React.Component {

    props: {
        location?: any,
        histroy?: any
    };
    @observable data: any = {docs: []};
    @observable isLoading: boolean = false;
    @observable isShowEdit: boolean = false;


    // @observable page:number=1;


    async componentDidMount() {
        const {page} = this.props.location.match.params;
        // :page
        this.loadData(page ? page : 1);
    }

    @action
    async loadData(page, callback?) {
        var _t = this;
        let rst = await api.get(`/book/getBooksOfPg/${page}`);
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


    onChange(page) {
        this.loadData(page, () => {
            this.props.location.history.push(`/admin_book/${page}`);
        });
    }

    @action
    showEdit(e) {
        this.isShowEdit = true;
    }

    @action
    onCloseEdit() {
        this.isShowEdit = false;
    }

    render() {
        var {page} = this.props.location.match.params;
        page = page ? parseInt(page) : 1;

        const columns = [{
            title: '书名',
            dataIndex: 'cn_name',
            key: 'cn_name',
            render: (text, record) => <NavLink to={`/admin_book/${page}/${record._id}`}>{text}</NavLink>,
        }, {
            title: '书名',
            dataIndex: 'en_name',
            key: 'en_name',
        },
            {
                title: '时间',
                dataIndex: 'create_time',
                key: 'create_time',
            }];

        var pageConfig = {
            total: this.data.total,
            defaultCurrent: page,
            onChange: this.onChange.bind(this),
            pageSize: 5

        };


        {/*<NavLink to="/about">About</NavLink>*/
        }

        // console.log(this.data.docs);

        var dataSource = this.data.docs.map(d => d);

        var props = {
            onClose: this.onCloseEdit.bind(this)
        };
        return (
            <div>
                {this.isShowEdit ? <BookEdit {...props}></BookEdit> : ''}
                <div>
                    <Button onClick={this.showEdit.bind(this)} type="primary">新增</Button>
                    <Button onClick={this.importBook.bind(this)} type="primary">导入书籍</Button>
                </div>

                <div>
                    {this.isLoading ? <Spin/> : ''}
                    <Table rowKey="_id" columns={columns} pagination={pageConfig} dataSource={dataSource} size="small"/>
                </div>


            </div>
        );
    }


}