import './index.scss';
import {observer, Provider} from 'mobx-react';
import * as React from 'react';

@observer
export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTab: ''
        };
    }
    async componentDidMount() {


    }

    props:{
        tabs:any

    }


    render() {


        return (
            <div className='tabs-apple'>





            </div>
        );
    }


}