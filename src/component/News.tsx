import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import MoliEditor from './editor';
import * as React from 'react';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import {observable, computed} from 'mobx';
import {observer} from "mobx-react";
import elementClass from 'element-class';
import MBlock from './MBlock';

@observer
export default class News extends React.Component {

    @observable se: any;

    render() {
        var blocks=[];
        for (var i = 0; i < 100; i++) {
            blocks.push(<MBlock key={i} content={''}></MBlock>);
        }

        return (
            <div      className='canvas-reader'>
                {blocks}
            </div>
        )
    }


}