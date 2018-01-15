import {Form, Avatar, Card, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import './Book.css';
const {Meta} = Card;
import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom'
import * as React from 'react';
import api from '../../../api';


@observer
export default class Book extends React.Component {

    @observable data: any = {};

    // @observable page:number=1;


    async componentDidMount() {
        this.loadData(1);
    }

    @action
    async loadData(page) {
        let rst = await api.get(`/book/getBooksOfPg/${page}`);
        if (rst.code === 1) {
            runInAction(() => {
                this.data = rst.data;
            })



        }
    }


    onChange(page) {
        this.loadData(page);
    }

    render() {


        return (
            <div>
                <div className="bookList">
                    {
                        this.data && this.data.docs ? this.data.docs.map(d => <Card
                            key={d._id}
                            style={{width: 300}}
                            cover={<img alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>}
                            actions={[<Icon type="setting"/>, <Icon type="edit"/>, <Icon type="ellipsis"/>]}
                        >
                            <Meta
                                className="bookList__card"
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                title={d.cn_name}
                                description="This is the description"
                            />
                        </Card>):''
                    }
                </div>



            </div>
        )
    }


}