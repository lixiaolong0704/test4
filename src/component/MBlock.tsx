import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import MoliEditor from './editor';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import {observable, computed, autorun} from 'mobx';
import {observer} from 'mobx-react';
import elementClass from 'element-class';
/// <reference path="./iBlock.ts" />
import {elementData} from './iBlock';

var classNames = require('classnames');
import MElement from './MElement';

const uuidv1 = require('uuid/v1');
import _ from 'lodash';

var Color = require('color');

function textNodesUnder(node) {
    var all = [];
    for (node = node.firstChild; node; node = node.nextSibling) {
        if (node.nodeType == 3) all.push(node);
        else all = all.concat(textNodesUnder(node));
    }
    return all;
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
    p: any;

    constructor(props: any) {
        super(props);
        this.isMouseDowning = false;

    }

    // @computed get el() {
    //     return this.price * this.amount;
    // }

    componentDidMount() {
        var aaa = `As your app grows,<span style="font-weight: bold;font-size: 24px;"> you can catch</span> a lot of bugs with typechecking. For some applications, you can use JavaScript extensions like Flow or TypeScript to typecheck your whole application. But even if you don’t use those, React has some built-in typechecking abilities. To run typechecking on the props for a component, you can assign the special propTypes property:`;
        // var aaa = `As your app grows,<span style="font-weight: bold"> you can catch</span> a  ng. For some applications, you can use JavaScript extensions like Flow or TypeScript to `;

        // var htmlObject = document.createElement('p');
        var htmlObject = this.p;
        htmlObject.innerHTML = aaa;
        // var sp= document.createElement('span');
        // sp.innerText='abc';
        // // htmlObject.firstChild.replaceWith(sp);
        //
        var nodes = textNodesUnder(htmlObject);


        this.elementsData = [];
        var index = 0;
        _.map(nodes, (textNode) => {
            var _elementsDataOfTextNode = this.textToElementData(textNode.nodeValue);
            // var div= document.createElement("div");

            var spans = _.map(_elementsDataOfTextNode, (data: elementData) => {


                var span = document.createElement("span");
                // ReactDOM.render(<MElement ref={(span)=>{
                //
                //
                //     // data.tag = span;
                //     // data.tag = span;
                //
                //
                //     // span.innerText = data.text;
                //
                //     console.log("ffff");
                //
                //
                // }} isActive={data.isActive}
                //                           isSelected={data.isSelected}
                //                           key={data.key}
                //                           index={data.index}>{data.text}</MElement>, document.createElement("span"));
                data.index = index;
                data.tag = span;
                this.elementsData.push(data);
                index++;
                // const dd =observable(data);
                console.log("aaaaa");

                // autorun(()=>{
                //     console.log("run ...");
                //     // data = this.elementsData[index];
                //     ReactDOM.render(<MElement isActive={dd.isActive}
                //                               isSelected={dd.isSelected}
                //                               key={dd.key}
                //                               index={dd.index}>{dd.text}</MElement>, span);
                //
                // })


                return span;
            });
            // textNode.replaceWith(tt);
            console.log("ffff");
            textNode.replaceWith(...spans);

        });
        _.map(this.elementsData, (dd) => {
            autorun(() => {
                this.attachStyle(dd,dd.tag);

            });

        });



        // ReactDOM.render(aa,this.p);
        // console.log(htmlObject);

        // var aaa = `As your app grows `;
        // var rpValue = `<span class="canvas-reader__el">$1</span>`;
        // this.current= aaa.replace(/([a-zA-Z’-]+|[\,\.,:])/g, rpValue) ;
        // ReactDOM.render(React.createElement("p",{},htmlObject), this.p);

        // this.p.appendChild(htmlObject);
        // this.p.appendChild(htmlObject);
        // this.elementsData = elementsData;

        // this.elementsData = this.textToElementData(aaa);


    }

    attachStyle(data: elementData, span) {
        var className = classNames({
            'canvas-reader__p_el': true,
            'canvas-reader__p_el_active': data.isActive,
            'canvas-reader__p_el_selected': data.isSelected
        });


        var backgroundColor = null;
        if ((!data.isActive ) && (data.isSelected > 0)) {
            backgroundColor = Color('#f0f0f0').darken(0.1 * data.isSelected).rgb().toString();
        }
        span.setAttribute("custom-index", data.index);
        span.innerText = data.text;
        span.className = className;
        span.style.backgroundColor = backgroundColor;
        console.log("attch");
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
        let isMeet = false, isOK = false;

        _.map(this.elementsData, (element) => {
            if (isOK) return;
            if (element.index === endIndex) {
                isMeet = false;
                ita(element);
                isOK = true;
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
        clearTimeout(this.h);
        const closeUp = () => {
            this.endSelect();
            this.isMouseDowning = false;
        }
        this.h = setTimeout(closeUp, 2000);
    }

    endSelect() {
        this.start = null;
        this.end = null;
        _.map(this.elementsData, element => {
            element.isActive = false;
        });
    }

    h: any

    onMouseUp(e) {

        if (this.isMouseDowning) {
            // clearTimeout(this.h);
            // const closeUp=()=>{


            this.iteElements(this.start.index, this.end.index, (element) => {
                element.isSelected++;
            });
            // this.start.isSelected = true;
            // this.end.isSelected = true;
            this.endSelect();
            // }
            //
            // this.h=setTimeout(closeUp,500);

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


        console.log('run block render');
        return (

            <p className="canvas-reader__p" onMouseDown={this.onMouseDown.bind(this)}
               onMouseUp={this.onMouseUp.bind(this)}
               onMouseMove={this.onMouseMove.bind(this)}
               onMouseLeave={this.onMouseLeave.bind(this)}
               ref={(p) => {
                   this.p = p;
               }}
            >


            </p>


        );
    }


}