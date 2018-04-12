import {List, Pagination} from 'antd';

import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import * as React from 'react';
import api from '../api';
@observer
export default class FragmentList extends React.Component {

    @observable name: String;
    @observable fragmentsList?: any;
    @observable currentFragment?: any;
    @observable total?: number;
    @observable page?: number;

    constructor(props: any) {
        super(props);
    }

    props: {
        onUpdateCurrentFragment: Function
    };


    setCurrent(item) {
        this.currentFragment =item;
        this.props.onUpdateCurrentFragment(item);
    }

    async loadData(page: number, pageSize?) {
        let rst = await api.get(`http://localhost:4000/getFragmentsOfPg/${page}`);
        // console.log(rst);
        this.setState({
            page,
            fragmentsList: rst.data.data.docs,
            total: parseInt(rst.data.data.total)
        });
        this.setCurrent({});

    }

    async componentDidMount() {
        this.loadData(1);

    }

    render() {


        return (
            <div>
                <div>
                    {this.fragmentsList?this.fragmentsList.map((item)=>{
                        <div>
                            <span onClick={() => this.setCurrent(item)}>{item.name}</span>
                            <span>{item.ref_link}</span>
                        </div>
                    }):''}
                </div>


                <Pagination onChange={this.loadData.bind(this)} current={this.page} pageSize={5}
                            defaultCurrent={1} total={this.total}/>
            </div>
        );
    }


}

