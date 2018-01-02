import {List} from 'antd';


import * as React from 'react';
import axios from 'axios';

export default class FragmentList extends React.Component {


    constructor(props: any) {
        super(props);
        this.state = {
            name: 'zhansan'
        };
    }

    props:{
        onUpdateCurrentFragment:Function
    }
    state: {
        name: String,
        fragmentsList?: any
        currentFragment?:any
    }
    setCurrent(item){
        this.setState({currentFragment:item});
        this.props.onUpdateCurrentFragment(item);
    }

    async loadData(){
        let rst = await axios.get('http://localhost:4000/getAllFragments');
        // console.log(rst);
        this.setState({
            fragmentsList: rst.data.data
        })

    }
    async componentDidMount() {
        this.loadData();

    }

    render() {


        return (
            <List
                itemLayout="horizontal"
                dataSource={this.state.fragmentsList}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<span onClick={()=>this.setCurrent(item) }>{item.name}</span>}
                            description={item.ref_link}
                        />
                    </List.Item>
                )}
            >
            </List>
        )
    }


}

