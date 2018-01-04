import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import MoliEditor from './editor';
import * as React from 'react';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import {observable, computed} from 'mobx';
import {observer} from "mobx-react";
import elementClass from 'element-class';
@observer
export default class News extends React.Component {

    @observable se: any;



    start_el:any;

    onMouseDown(e) {
        // console.log(e);
        if (elementClass(e.target).has('canvas-reader__el')) {
            this.se = e.target.innerText;
            // e.target.className.
            elementClass(e.target).add('canvas-reader__el_selected')
            this.start_el = e.target;
        }
    }
    onMouseMove(e){
        if (elementClass(e.target).has('canvas-reader__el')) {

            var end_el = e.target;



        }


    }
    onMouseUp() {

        this.start_el =null;
    }

    render() {




        var str = '';
        for (var i = 0; i < 100; i++) {

            var aaa = `As your app grows, you can catch a lot of bugs with typechecking. For some applications, you can use JavaScript extensions like Flow or TypeScript to typecheck your whole application. But even if you don’t use those, React has some built-in typechecking abilities. To run typechecking on the props for a component, you can assign the special propTypes property:`;
            var rpValue = `<span class="canvas-reader__el">$1</span>`;
            str += "<p>"+aaa.replace(/([a-zA-Z’-]+|[\,\.,:])/g, rpValue)+"</p>";

        }


        return (
            <div>
                {this.se}
                <div onMouseDown={this.onMouseDown.bind(this)}
                     onMouseUp={this.onMouseUp.bind(this)}
                     onMouseMove={this.onMouseMove.bind(this)}
                     className='canvas-reader'
                     dangerouslySetInnerHTML={{__html: str}}>

                </div>


            </div>
        )
    }


}