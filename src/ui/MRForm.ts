// import {Form} from 'mobx-react-form';

import {Form} from './mrf/index.js';
import validatorjs from 'validatorjs';

validatorjs.setMessages('cn', {
    required: '请输入:attribute',
    between: '长度必须再:min :max之间'
});
validatorjs.useLang('cn');
export default class MRForm extends Form {

    options: any;

    constructor(options?) {
        super(options, {
            options: {
                showErrorsOnBlur: false
                // validateOnBlur:false
            }
        });
        this.options = Object.assign({
            onSuccess: () => {
            },
            setup: () => {
            }
        }, options);

    }

    /*
      Below we are returning a `plugins` object using the `validatorjs` package
      to enable `DVR` functionalities (Declarative Validation Rules).
    */
    plugins() {
        return {dvr: validatorjs};
    }


    /*
      Event Hooks
    */
    hooks() {
        return {
            /*
              Success Validation Hook
            */
            onSuccess(form) {
                // alert('Form is valid! Send the request here.');
                // get field values
                console.log('Form Values!', form.values());
                this.options.onSuccess(form.values());
            },
            /*
              Error Validation Hook
            */
            onError(form) {
                // alert('Form has errors!');
                // get all form errors
                console.log('All form errors', form.errors());
            }
        };
    }
}