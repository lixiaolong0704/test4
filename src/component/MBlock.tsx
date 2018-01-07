import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import MoliEditor from './editor';
import * as React from 'react';

import {observable, computed, autorun, action} from 'mobx';
import {observer, inject} from 'mobx-react';
import elementClass from 'element-class';
/// <reference path="./iBlock.ts" />
import {elementData} from './iBlock';

var classNames = require('classnames');

import axios from 'axios';

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

@inject("reading")
@observer
export default class MBlock extends React.Component {
    props: {
        content: string,
        reading?: any,
        book_id: string,
        paragraph_id: string //paragraph_id
        default_remarks: any
    };

    @observable remarks: any = []

    elementsData: elementData[];
    spans: any;
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

    convertHtml() {
        // var aaa = `As your app grows,<span style="font-weight: bold;font-size: 24px;"> you can catch</span> a lot of bugs with typechecking. For some applications, you can use JavaScript extensions like Flow or TypeScript to typecheck your whole application. But even if you don’t use those, React has some built-in typechecking abilities. To run typechecking on the props for a component, you can assign the special propTypes property:`;
        // var aaa = `As your app grows,<span style="font-weight: bold"> you can catch</span> a  ng. For some applications, you can use JavaScript extensions like Flow or TypeScript to `;

        var htmlObject = this.p;
        htmlObject.innerHTML = this.props.content;
        // var sp= document.createElement('span');
        // sp.innerText='abc';
        // // htmlObject.firstChild.replaceWith(sp);
        //
        var nodes = textNodesUnder(htmlObject);


        this.elementsData = [];
        this.spans = [];
        var index = 0;
        _.map(nodes, (textNode) => {
            var _elementsDataOfTextNode = this.textToElementData(textNode.nodeValue);
            // var div= document.createElement("div");

            var spans = _.map(_elementsDataOfTextNode, (data: elementData) => {

                data.index = index;
                var span = document.createElement("span");
                span.innerText = data.text;
                span.setAttribute("custom-index", index + "");
                span.setAttribute("class", "canvas-reader__p_el");

                data.tag = span;

                this.elementsData.push(observable(data));

                index++;


                return span;
            });
            // textNode.replaceWith(tt);
            // console.log("ffff");
            textNode.replaceWith(...spans);

        });
        _.map(this.elementsData, (dd) => {
            // var aa=observable(dd);
            autorun(() => {

                var aa = dd;
                // console.log(aa.text + "--" + aa.isActive + "---" + aa.isSelected);
                this.attachStyle(dd, dd.tag);
            });

        });


    }

    @action
    async componentDidMount() {

        // this.loadRemarks();
        this.convertHtml();
        //after elementsData init
        this.props.default_remarks ? this.props.default_remarks.map(r => {
            if(r.start === r.end){
                this.elementsData[r.start].isSelected++;
            }else{
                var c =r.start;
                while(c <= r.end){
                    this.elementsData[c].isSelected++;
                    c++;
                }
            }
            this.remarks.push(r);
        }) : null;

        // console.log("--"+(this.remarks?this.remarks.length:0));

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

        // span.innerText = data.text;
        span.className = className;
        span.style.backgroundColor = backgroundColor;
        // console.log(data.text + "attch");
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

    iteElements(downIndex, upIndex, ita, iteOther) {
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
            if (isOK) {
                iteOther(element);
                return;
            }
            if (element.index === endIndex) {
                isMeet = false;
                ita(element);
                isOK = true;
                return;
            }
            if ((element.index === startIndex) || isMeet) {
                isMeet = true;
                ita(element);
            } else {
                iteOther(element);
            }

        });

        return {
            start: startIndex,
            end: endIndex
        }
    }

    @action
    onMouseDown(e) {

        if (elementClass(e.target).has('canvas-reader__p_el')) {

            this.props.reading.deActive();
            this.end = this.start = this.findElement(e.target);
            if (this.start) {
                this.start.isActive = true;
            }
            this.isMouseDowning = true;

        }
    }

    @action
    onMouseMove(e) {
        if (this.isMouseDowning && elementClass(e.target).has('canvas-reader__p_el')) {
            _.map(this.elementsData, element => {
                //     element.isActive = false;
                // });
                this.iteElements(this.start.index, parseInt(e.target.getAttribute('custom-index')), (element) => {
                    element.isActive = true;
                }, (el) => {
                    el.isActive = false;
                });
            });
            this.end = this.findElement(e.target);
            // if (this.end) {
            //     this.end.isActive = true;
            // }
        }
    }

    @action
    onMouseLeave() {
        clearTimeout(this.h);
        const closeUp = () => {
            this.endSelect();
            this.isMouseDowning = false;
            // _.map(this.elementsData, element => {
            //     element.isActive = false;
            // });
        }
        this.h = setTimeout(closeUp, 500);
    }

    endSelect() {
        this.start = null;
        this.end = null;

    }

    h: any

    @action
    onMouseUp(e) {

        if (this.isMouseDowning) {
            // clearTimeout(this.h);
            // const closeUp=()=>{


            var selection = '';
            var selectionElsData = [];
            var index = this.iteElements(this.start.index, this.end.index, (element) => {
                selection += element.text + " ";
                selectionElsData.push(element)
                // element.isSelected++;
            }, () => 0);
            if (this.end)
                this.props.reading.setCurrent(selection, selectionElsData, index, this.props.book_id, this.props.paragraph_id);
            this.endSelect();

        }

        this.isMouseDowning = false;
    }

    render() {
        console.log(this.remarks ? this.remarks.length : 0);
        return (

            <p className="canvas-reader__p" onMouseDown={this.onMouseDown.bind(this)}
               onMouseUp={this.onMouseUp.bind(this)}
               onMouseMove={this.onMouseMove.bind(this)}
               onMouseLeave={this.onMouseLeave.bind(this)}
               ref={(p) => {
                   this.p = p;
               }}
            >F


            </p>


        );
    }


}