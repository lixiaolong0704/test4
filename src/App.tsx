import * as React from 'react';
import './App.css';
import 'antd/dist/antd.css';

import {Layout, Menu, Breadcrumb, Icon} from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'


import {Button} from 'antd';
// const logo = require('./logo.svg');
import {observable, computed} from 'mobx';

import Fragment from './component/Fragment';


// import  {} from 'draft-js';
class OrderLine {
    @observable price = 0;
    @observable amount = 1;

    @computed
    get total() {
        return this.price * this.amount;
    }
}


var a = new OrderLine();

var testHtml = `
    <div>
     <div>fuck you ok ?</div>
     <div>not ok cc mm</div>
    
</div>
   
`;


class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        // this.state = {editorState: EditorState.createEmpty()};
        // this.onChange = (editorState:any) => this.setState({editorState});

    }


    render() {


        return (<div>
            <Router>
                <Layout>
                    <Header className="header">
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{background: '#fff'}}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%', borderRight: 0}}
                            >
                                <SubMenu key="sub1" title={<span><Icon type="user"/>subnav 1</span>}>
                                    <Menu.Item key="1"><Link to="/fragment">Fragment</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/book">Book</Link></Menu.Item>
                                    <Menu.Item key="3">News</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="laptop"/>subnav 2</span>}>
                                    <Menu.Item key="5">option5</Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" title={<span><Icon type="notification"/>subnav 3</span>}>
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{padding: '0 24px 24px'}}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>

                                <Route exact path="/" component={()=>(<div>home</div>)}/>
                                <Route path="/fragment" component={()=><div>
                                    <Fragment></Fragment></div>}/>
                                <Route path="/book" component={()=><div>book</div>}/>


                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </Router></div>

        );
    }
}


export default App;
