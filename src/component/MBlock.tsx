import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import MoliEditor from './editor';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import {observable, computed,autorun} from 'mobx';
import {observer} from 'mobx-react';
import elementClass from 'element-class';

var classNames = require('classnames');
import MElement from './MElement';

const uuidv1 = require('uuid/v1');
import _ from 'lodash';

function textNodesUnder(node) {
    var all = [];
    for (node = node.firstChild; node; node = node.nextSibling) {
        if (node.nodeType == 3) all.push(node);
        else all = all.concat(textNodesUnder(node));
    }
    return all;
}

interface elementData {
    text: string
    key: string
    isActive: boolean
    isSelected: number
    index: number
}

@observer
export default class MBlock extends React.Component {
    props: {
        content: string
    };


    @observable elementsData: elementData[];
    @observable start: any;
    @observable end: any;
    isMouseDowning: boolean;
    p:any

    constructor(props: any) {
        super(props);
        this.isMouseDowning = false;

    }
    // @computed get el() {
    //     return this.price * this.amount;
    // }

    componentDidMount() {
        var aaa = `As your app grows,<span style="font-weight: bold"> you can catch</span> a lot of bugs with typechecking. For some applications, you can use JavaScript extensions like Flow or TypeScript to typecheck your whole application. But even if you don’t use those, React has some built-in typechecking abilities. To run typechecking on the props for a component, you can assign the special propTypes property:`;

        var htmlObject = document.createElement('p');
        htmlObject.innerHTML = aaa;
        // var sp= document.createElement('span');
        // sp.innerText='abc';
        // // htmlObject.firstChild.replaceWith(sp);
        //
        var nodes = textNodesUnder(htmlObject);


        this.elementsData = [];
        var index=0;
        _.map(nodes, (textNode) => {
            var _elementsDataOfTextNode = this.textToElementData(textNode.nodeValue);


            var spans = _.map(_elementsDataOfTextNode, (data: elementData) => {
                data.index=index;
                this.elementsData.push(data);
                var span = document.createElement('span');
                ;
                span.innerText = data.text;
                autorun(()=>{
                    console.log("run ...");
                    ReactDOM.render(<MElement isActive={data.isActive}
                                              isSelected={data.isSelected}
                                              key={data.key}
                                              index={data.index}>{data.text}</MElement>, span);

                })


                return span;
            });
            textNode.replaceWith(...spans);

        });
        // console.log(htmlObject);

        // var aaa = `As your app grows `;
        // var rpValue = `<span class="canvas-reader__el">$1</span>`;
        // this.current= aaa.replace(/([a-zA-Z’-]+|[\,\.,:])/g, rpValue) ;
        // ReactDOM.render(React.createElement("p",{},htmlObject), this.p);

        // this.p.appendChild(htmlObject);
        this.p.appendChild(htmlObject);
        // this.elementsData = elementsData;

        // this.elementsData = this.textToElementData(aaa);


    }

    textToElementData(myString: string): elementData[] {

        var myRegexp = /([a-zA-Z’-]+|[\,\.,:])/g;
        var results = [];
        var match = myRegexp.exec(myString);
        var index = 0;
        while (match != null) {
            // matched text: match[0]
            // match start: match.index
            // capturing group n: match[n]
            // console.log()
            results.push({
                text: match[0].trim(),
                key: uuidv1(),
                isActive: false,
                isSelected: 0,
                index
            });
            index++;
            match = myRegexp.exec(myString);

        }
        return results;
    }

    findElement(target) {
        var index = parseInt(target.getAttribute('custom-index'));
        return _.find(this.elementsData, e => e.index === index);
    }

    iteElements(downIndex, upIndex, ita) {
        var startIndex = 0, endIndex = 0;
        if (downIndex <= upIndex) {
            startIndex = downIndex;
            endIndex = upIndex;
        } else {
            startIndex = upIndex;
            endIndex = downIndex;
        }
        // console.log(startIndex + "--" + endIndex);
        let isMeet = false;
        _.map(this.elementsData, (element) => {
            if (element.index === endIndex) {
                isMeet = false;
                ita(element);
                return;
            }
            if ((element.index === startIndex) || isMeet) {
                isMeet = true;
                ita(element);
            }

        });
    }

    onMouseDown(e) {
        console.log(e);
        if (elementClass(e.target).has('canvas-reader__p_el')) {
            // this.se = e.target.innerText;
            // e.target.className.
            // elementClass(e.target).add('canvas-reader__p_el_active')
            this.end = this.start = this.findElement(e.target);


            if (this.start) {
                this.start.isActive = true;
            }
            this.isMouseDowning = true;

        }
    }

    onMouseMove(e) {
        if (this.isMouseDowning && elementClass(e.target).has('canvas-reader__p_el')) {
            _.map(this.elementsData, element => {
                element.isActive = false;
            });
            this.iteElements(this.start.index, parseInt(e.target.getAttribute('custom-index')), (element) => {
                element.isActive = true;
            });
            this.end = this.findElement(e.target);
            // if (this.end) {
            //     this.end.isActive = true;
            // }
        }
    }

    onMouseLeave() {
        this.endSelect();
        this.isMouseDowning = false;
    }

    endSelect() {
        this.start = null;
        this.end = null;
        _.map(this.elementsData, element => {
            element.isActive = false;
        });
    }

    onMouseUp(e) {

        if (this.isMouseDowning) {
            this.iteElements(this.start.index, this.end.index, (element) => {
                element.isSelected++;
            });
            // this.start.isSelected = true;
            // this.end.isSelected = true;
            this.endSelect();

            // this.forceUpdate();
        }

        this.isMouseDowning = false;
    }

    render() {
        //
        // dangerouslySetInnerHTML={{__html: this.current}}


        // const elements = this.elementsData ? this.elementsData.map((el) => <MElement isActive={el.isActive}
        //                                                                              isSelected={el.isSelected}
        //                                                                              key={el.key}
        //                                                                              index={el.index}>{el.text}</MElement>) : null;
        var a=this.elementsData;

        console.log("run block render");
        return (
            <div>
                <p className="canvas-reader__p" onMouseDown={this.onMouseDown.bind(this)}
                   onMouseUp={this.onMouseUp.bind(this)}
                   onMouseMove={this.onMouseMove.bind(this)}
                   onMouseLeave={this.onMouseLeave.bind(this)}
                   ref={(p) => { this.p = p; }}
                >


                </p>
                {/*{a?a[0].isSelected:0}*/}
            </div>

        );
    }


}