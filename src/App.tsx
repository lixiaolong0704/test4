///<reference path="component/antdext.d.ts"/>
import * as React from 'react';
import './App.scss';
import 'antd/dist/antd.css';

import 'react-select/dist/react-select.css';


import PropTypes from 'prop-types';
import {Layout,Form, Menu, Breadcrumb, Icon} from 'antd';

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
import global from './component/store/global'


import {observer, Provider} from 'mobx-react';

import {observable, computed, autorun, action,runInAction} from 'mobx';





import Login from './component/Login';


import Dashboard from './component/Dashboard';
import UiDemo from './UiDemo';



import _ from 'lodash';
import Test from './Test.js';

// import  {} from 'draft-js';
require('./api');
var auth = new Auth();
var _global =new global();

const WrappedNormalLoginForm = Form.create()(Login);

import Modal from 'react-modal';
@observer
class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

    }


    @observable auth = auth;


    async componentDidMount() {

        Modal.setAppElement('#root')

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
                <Router>
                    <Provider auth={this.auth} global={_global}>

                        <Switch>
                            <Route path="/login" component={WrappedNormalLoginForm}/>
                            <Route path="/ui-demo" component={UiDemo}/>

                            <Route path="/404" component={() => <div>404 No Match</div>}/>
                            <Route exact={false} path="/" component={({location})=><Dashboard location={location}></Dashboard>}/>

                        </Switch>
                    </Provider>
                </Router>
        );
    }
}


export default App;
