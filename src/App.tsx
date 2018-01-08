///<reference path="component/antdext.d.ts"/>
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
    withRouter,
    Redirect
} from 'react-router-dom';

import Auth from './component/store/Auth';
import {observer, Provider} from 'mobx-react';

import {Button} from 'antd';
// const logo = require('./logo.svg');
import {observable, computed, autorun, action,runInAction} from 'mobx';


import Login from './component/Login';
import Dashboard from './component/Dashboard';
import _ from 'lodash';
import Test from './Test.js';

// import  {} from 'draft-js';
require('./api');
var auth = new Auth();

@observer
class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

    }


    @observable auth = auth;


    async componentDidMount() {



    }
    @action
    async componentWillMount(){


    }


    render() {


        //todo  <Dashboard location={location}></Dashboard> <-- diff of --> const ConnecttedDashboard =withRouter(Dashboard);
        //

        // const AuthC = observer(({match}) => {
        //     return this.auth.loggedIn ? <Dashboard/> : <Redirect to="/login"/>;
        // });
        console.log('App');
        //todo 确认一下exact作用！
        return (
            <div>
                <Router>
                    <Provider auth={this.auth}>

                        <Switch>
                            <Route path="/login" component={Login}/>
                            <Route path="/404" component={() => <div>404 No Match</div>}/>
                            <Route exact={false} path="/" component={({location})=><Dashboard location={location}></Dashboard>}/>

                        </Switch>
                    </Provider>
                </Router>


            </div>

        );
    }
}


export default App;
