var Color = require('color');
var classNames = require('classnames');
import * as React from 'react';

export default class MElement extends React.Component {

    constructor(props) {
        super(props);


    }


    props: {
        isActive: boolean,
        isSelected: number,
        index: number,
        children: any
    };

    render() {
        var className = classNames({
            'canvas-reader__p_el': true,
            'canvas-reader__p_el_active': this.props.isActive,
            'canvas-reader__p_el_selected': this.props.isSelected
        });


        var backgroundColor = null;
        if ((!this.props.isActive ) && (this.props.isSelected > 0)) {
            backgroundColor = Color('#f0f0f0').darken(0.1 * this.props.isSelected).rgb().toString();
        }
        return <span style={{backgroundColor}} className={className}
                     custom-index={this.props.index}>{this.props.children}</span>;
    }

}