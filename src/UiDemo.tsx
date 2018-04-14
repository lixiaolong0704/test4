
import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import * as React from 'react';

import {Input,Button} from 'ui/index';
@observer
export default class UiDemo extends React.Component {



    async componentDidMount() {

    }



    render() {


        return (
            <div className='ui-demo'>
                <Input/>


                <Button onClick={e=>{}}>提交</Button>

            </div>
        );
    }


}