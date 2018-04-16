import './Button.scss';

import * as React from 'react';
import classnames from 'classnames';

export type ButtonType = 'primary' | 'light' | 'dashed' | 'danger';

export default class Button extends React.Component {


    async componentDidMount() {

    }

    props: {
        onClick?: Function,
        children?: any,
        type?: ButtonType,
        isLoading?: false
    };

    onClick(e) {
        if (!this.props.isLoading) {
            this.props.onClick(e);
        }
    }

    render() {

        const {type} = this.props;

        const classes = classnames('ml-button', {
            [`ml-button--${type}`]: type
        });
        return (
            <button onClick={this.onClick.bind(this)} className={classes}>{
                this.props.children
            }</button>

        );
    }


}