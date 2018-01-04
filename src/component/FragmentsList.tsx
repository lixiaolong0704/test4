import {List, Pagination} from 'antd';


import * as React from 'react';
import axios from 'axios';

export default class FragmentList extends React.Component {


    constructor(props: any) {
        super(props);
        this.state = {
            name: 'zhansan'
        };
    }

    props: {
        onUpdateCurrentFragment: Function
    }
    state: {
        name: String,
        fragmentsList?: any
        currentFragment?: any
        total?:number,
        page?:number
    }

    setCurrent(item) {
        this.setState({currentFragment: item});
        this.props.onUpdateCurrentFragment(item);
    }

    async loadData(page:number, pageSize?) {
        let rst = await axios.get(`http://localhost:4000/getFragmentsOfPg/${page}`);
        // console.log(rst);
        this.setState({
            page,
            fragmentsList: rst.data.data.docs,
            total:parseInt(rst.data.data.total)
        })
        this.setCurrent({});

    }

    async componentDidMount() {
        this.loadData(1);

    }

    render() {


        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.fragmentsList}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<span onClick={() => this.setCurrent(item)}>{item.name}</span>}
                                description={item.ref_link}
                            />
                        </List.Item>
                    )}
                >
                </List>
                <Pagination onChange={this.loadData.bind(this)} current={this.state.page} pageSize={5} defaultCurrent={1} total={this.state.total}/>
            </div>
        )
    }


}

