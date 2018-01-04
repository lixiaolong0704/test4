import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import MoliEditor from './editor';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import {
    BrowserRouter as Router,
    Route,
    Link,
    NavLink
} from 'react-router-dom'
import * as React from 'react';

export default class Book extends React.Component {
    props: {
        match: any
    }

    render() {

        const match = this.props.match.match;

        return (
            <div>
                <h2>Topics</h2>
                <ul>
                    <li>
                        <NavLink activeClassName='selected' to={`${match.url}/rendering`}>
                            Rendering with React
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='selected' to={`${match.url}/components`}>
                            Components
                        </NavLink>
                    </li>
                    <li>
                        <Link to={`${match.url}/props-v-state`}>
                            Props v. State
                        </Link>
                    </li>
                </ul>

                <Route path={`${match.url}/rendering`} component={() => <div>rendering</div>}/>
                <Route path={`${match.url}/components`} component={() => <div>components</div>}/>
                <Route exact path={match.url} render={() => (
                    <h3>Please select a topic.</h3>
                )}/>
            </div>
        )
    }


}