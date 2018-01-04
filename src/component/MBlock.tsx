import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import MoliEditor from './editor';
import * as React from 'react';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import {observable, computed} from 'mobx';
import {observer} from "mobx-react";
import elementClass from 'element-class';

const uuidv1 = require('uuid/v1');
import _ from 'lodash'

function MElement(props) {

    return <span className="canvas-reader__p_el" custom-key={props.tkey}>{props.children}</span>;
}

@observer
export default class MBlock extends React.Component {

    @observable elements: any;
    @observable start: any;
    @observable end: any


    props: {
        content: string
    }
    start_el: any;

    componentDidMount() {


        var aaa = `As your app grows, you can catch a lot of bugs with typechecking. For some applications, you can use JavaScript extensions like Flow or TypeScript to typecheck your whole application. But even if you don’t use those, React has some built-in typechecking abilities. To run typechecking on the props for a component, you can assign the special propTypes property:`;
        // var rpValue = `<span class="canvas-reader__el">$1</span>`;
        // this.current= aaa.replace(/([a-zA-Z’-]+|[\,\.,:])/g, rpValue) ;
        this.elements = this.getElements(aaa);


    }

    getElements(myString) {

        var myRegexp = /([a-zA-Z’-]+|[\,\.,:])/g;
        var results = [];
        var match = myRegexp.exec(myString);
        while (match != null) {
            // matched text: match[0]
            // match start: match.index
            // capturing group n: match[n]
            // console.log()
            results.push({
                text: match[0].trim(),
                key: uuidv1()
            });
            match = myRegexp.exec(myString);

        }
        return results;
    }

    findElement(target) {
        var key = target.getAttribute("custom-key");
        return _.find(this.elements, e => e.key === key);
    }

    onMouseDown(e) {
        // console.log(e);
        if (elementClass(e.target).has('canvas-reader__p_el')) {
            // this.se = e.target.innerText;
            // e.target.className.
            elementClass(e.target).add('canvas-reader__p_el_selected')
            this.start = this.findElement(e.target);
        }
    }

    onMouseMove(e) {
        if (elementClass(e.target).has('canvas-reader__p_el')) {
            this.end = this.findElement(e.target);
        }
    }

    onMouseUp() {

        this.start_el = null;
    }

    render() {
        //
        // dangerouslySetInnerHTML={{__html: this.current}}

        return (
            <p className="canvas-reader__p" onMouseDown={this.onMouseDown.bind(this)}
               onMouseUp={this.onMouseUp.bind(this)}
               onMouseMove={this.onMouseMove.bind(this)}

            >
                {this.elements ? this.elements.map((el) => <MElement key={el.key}
                                                                     tkey={el.key}>{el.text}</MElement>) : ''}
            </p>
        )
    }


}