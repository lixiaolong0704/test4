import * as React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink,
    matchPath,
    Switch,
    withRouter
} from 'react-router-dom'


import {Button} from 'antd';
// const logo = require('./logo.svg');
import {observable, computed} from 'mobx';

import Fragment from './component/Fragment';
import Book from './component/Book';
import News from './component/News';
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



        // this.onChange = (editorState:any) => this.setState({editorState});

    }
    componentDidMount(){
        // console.log(this.context.router)
        // alert(matchPath);
    }


    render() {



        // A simple component that shows the pathname of the current location
        class ShowTheLocation extends React.Component {
            static propTypes = {
                match: PropTypes.object.isRequired,
                location: PropTypes.object.isRequired,
                history: PropTypes.object.isRequired
            }
            props:{
                match:any,
                location:any,
                history:any

                onLocationChange?:any

            }
            setActive({item,key}){
                // this.setState({activeKey:key});
            }
            onLocationChange(){
                console.log("change...");
                // this.setState({activeKey:"book"});
            }
            constructor(props){
                super(props)

            }
            getActiveKey(location){
                var keys=['fragment','book','news'];
                var activeKey=null;
                keys.forEach((key)=>{
                    if(matchPath(location.pathname, {path:'/'+key,strict:false,exact: false,sensitive:false })){
                        activeKey =key;
                        // this.state={
                        //     activeKey:key
                        // }
                    }

                })
                return activeKey;
            }

            state:{
                activeKey:any
            }
            render() {
                const { match , location, history } = this.props

                // this.props.onLocationChange(location);


                const createNavLink = (to: string) => {
                    return <NavLink exact={false} activeClassName='selected'  to={`/${to}`}>{to}</NavLink>
                };



                return (
                    <Menu
                        mode="inline"

                        selectedKeys={[this.getActiveKey(location)]}
                        onClick={this.setActive.bind(this)}

                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        <SubMenu key="sub1" title={<span><Icon type="user"/>hihi</span>}>
                            <Menu.Item key="fragment">{createNavLink('fragment')}</Menu.Item>
                            <Menu.Item key="book">{createNavLink('book')}</Menu.Item>
                            <Menu.Item key="news">{createNavLink('news')}</Menu.Item>
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
                )
            }
        }

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
        const ShowTheLocationWithRouter = withRouter(ShowTheLocation)




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

                                <ShowTheLocationWithRouter  ></ShowTheLocationWithRouter>





                            </Sider>
                            <Layout style={{padding: '0 24px 24px'}}>
                                <Breadcrumb style={{margin: '16px 0'}}>
                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                                    <Breadcrumb.Item>List</Breadcrumb.Item>
                                    <Breadcrumb.Item>App</Breadcrumb.Item>
                                </Breadcrumb>
                                <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>

                                    <Switch>
                                    <Route exact path="/" component={() => (<div>home</div>)}/>
                                    <Route path="/fragment" component={() => <div>
                                        <Fragment></Fragment></div>}/>
                                    <Route path="/book" component={(mc)=><Book match={mc}></Book>}/>
                                        <Route   path="/news" component={(mc:any) => (<News/>)}/>
                                    </Switch>

                                </Content>
                            </Layout>
                        </Layout>
                    </Layout>
                </Router></div>

        );
    }
}


export default App;
