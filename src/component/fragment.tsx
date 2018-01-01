import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

import * as React from 'react';

export default class Fragment extends React.Component {
    render() {


        return (
            <Form>

                <FormItem

                    label="ref"
                >

                    <Input type="password"/>

                </FormItem>
                <FormItem  >
                    <Button type="primary" htmlType="submit">Register</Button>
                </FormItem>
            </Form>
        )
    }


}