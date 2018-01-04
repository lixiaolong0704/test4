import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import MoliEditor from './editor';
import * as React from 'react';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import {observable, computed} from 'mobx';
import {observer} from "mobx-react";
@observer
export default class News extends React.Component {

    @observable   se:any;
    onMouseDown(e) {
        // console.log(e);
        if(e.target.className==='canvas-reader__el'){
            this.se = e.target.innerText;
        }
    }
    onMouseUp(){

    }

    render() {


        var str = `As your app grows, you can catch a lot of bugs with typechecking. For some applications, you can use JavaScript extensions like Flow or TypeScript to typecheck your whole application. But even if you don’t use those, React has some built-in typechecking abilities. To run typechecking on the props for a component, you can assign the special propTypes property:`;

        var rpValue = `<span class="canvas-reader__el">$&</span>`;
        str = str.replace(/[a-zA-Z]*/g, rpValue);


        return (
            <div>
                {this.se}
                <div onMouseDown={this.onMouseDown.bind(this)}
                     onMouseUp={this.onMouseUp.bind(this)}
                     className='canvas-reader'
                     dangerouslySetInnerHTML={{__html: str}}>

                </div>


            </div>
        )
    }


}