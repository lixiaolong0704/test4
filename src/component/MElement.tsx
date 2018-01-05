var Color = require('color');
var classNames = require('classnames');
import * as React from 'react';
import {observable, computed} from 'mobx';
import {observer} from 'mobx-react';
import {elementData} from './iBlock';
@observer
export default class MElement extends React.Component {

    constructor(props) {
        super(props);


    }

    s:any

    props: {
        isActive: boolean,
        isSelected: number,
        index: number,
        children: any
    };
    componentDidMount(){
        // this.s.parentNode.replaceWith(this.s);
        // this.s.parentNode.re
        // var a=document.createElement("span");
        // a.innerText=this.props.children;
        // this.s.parentNode.replaceWith(this.s)
    }



    render() {
        console.log("run element change ...");
        var className = classNames({
            'canvas-reader__p_el': true,
            'canvas-reader__p_el_active': this.props.isActive,
            'canvas-reader__p_el_selected': this.props.isSelected
        });


        var backgroundColor = null;
        if ((!this.props.isActive ) && (this.props.isSelected > 0)) {
            backgroundColor = Color('#f0f0f0').darken(0.1 * this.props.isSelected).rgb().toString();
        }

        // return (React.cloneElement(this.props.children[0], {style: {backgroundColor}}));
        // return <span ref={(s)=>this.s=s} style={{backgroundColor}} className={className}
        //              custom-index={this.props.index}>{this.props.children}</span>;

        return this.props.children;
    }

}