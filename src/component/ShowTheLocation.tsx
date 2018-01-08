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
import {observer, inject} from 'mobx-react';
import * as React from 'react';
import {Menu, Tooltip, Icon} from 'antd';

const {SubMenu} = Menu;
export default class ShowTheLocation extends React.Component {

    props: {
        match: any,
        location: any,
        history: any
        onLocationChange?: any

    };

    setActive({item, key}) {
        // this.setState({activeKey:key});
    }

    constructor(props) {
        super(props);

    }

    getActiveKey(location) {
        var keys = ['fragment', 'book', 'news'];
        var activeKey = null;
        keys.forEach((key) => {
            if (matchPath(location.pathname, {
                    path: '/' + key,
                    strict: false,
                    exact: false,
                    sensitive: false
                })) {
                activeKey = key;
                // this.state={
                //     activeKey:key
                // }
            }

        });
        return activeKey;
    }



    render() {
        console.log("location change ...")
        const {match, location, history} = this.props;
        const createNavLink = (to: string) => {
            return <NavLink exact={false} activeClassName='selected' to={`/${to}`}>{to}</NavLink>;
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

            </Menu>
        );
    }
}