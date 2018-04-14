import './Button.scss';

import * as React from 'react';

export default class Button extends React.Component {


    async componentDidMount() {

    }

    props:{
        onClick?:Function,
        children?:any,
        type?:string
    }

    render() {


        return (
            <button onClick={this.props.onClick.bind(this)} className='ml-button'>{
                this.props.children
            }</button>

        );
    }


}