import './UiDemo.scss';
import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import * as React from 'react';
// import DevTools from 'mobx-react-form-devtools';
import {Input, Button} from 'ui/index';
import MobxReactForm from 'mobx-react-form';

import MobxReactFormDevTools from 'mobx-react-form-devtools';
import {MRForm} from './ui/index';

class TestForm extends MRForm {
    setup() {
        return {
            fields: [{
                name: 'email',
                label: 'Email',
                placeholder: 'Insert Email',
                rules: 'required|email|string|between:5,25',
            }]
        };
    }

}

import Select from 'react-select';



const Form = observer(({form}) => {


        // console.info("fick", form.$("email").bind());
        return <form className='form' onSubmit={form.onSubmit}>

            <Input  field={form.$('email')} />
            <Button onClick={form.onSubmit}>提交</Button>

        </form>
    }
    )
;
// register forms
MobxReactFormDevTools.register({
    Form
});

// select form to show into the devtools
MobxReactFormDevTools.select('registerForm');

// open the devtools (closed by default)
MobxReactFormDevTools.open(false);

@observer
export default class UiDemo extends React.Component {


    constructor(p){
        super(p);

    }
    async componentDidMount() {


    }
    @observable selectedOption = {value: 'one', label: 'One' }


    @action
    handleChange = (selectedOption) => {
        this.selectedOption =selectedOption;
        console.log(`Selected: ${selectedOption.label}`);
    }

    render() {

        const form = new TestForm();
        return (
            <div className='ui-demo'>
                {/*<MobxReactFormDevTools.UI/>*/}


                {/*<Form form={form}></Form>*/}
                <Select
                    name="form-field-name"
                    value={this.selectedOption}
                    onChange={this.handleChange.bind(this)}
                    options={[
                        { value: 'one', label: 'One' },
                        { value: 'two', label: 'Two' },
                    ]}
                />
            </div>
        );
    }


}