import './Button.scss';

import * as React from 'react';

export default class Button extends React.Component {


    async componentDidMount() {

    }

    props: {
        onClick?: Function,
        children?: any,
        type?: string,
        isLoading?: false
    }

    onClick(e) {
        if (!this.props.isLoading) {
            this.props.onClick(e);
        }
    }

    render() {


        return (
            <button onClick={this.onClick.bind(this)} className='ml-button'>{
                this.props.children
            }</button>

        );
    }


}