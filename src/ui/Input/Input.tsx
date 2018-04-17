import './Input.scss';

import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import {observer, Provider} from 'mobx-react';

@observer
export default class Input extends React.Component {


    async componentDidMount() {

    }

    props: {
        type?: string,
        className?: string
        value?: string,
        field?: any
        placeholder?: string
        rows?: any,
        cols?: any
    };

    renderInput(otherProps) {
        const {field} = this.props;
        return <input
            className="ml-input__input"
            {...field.bind({...otherProps})}

        />;
    }

    renderTextArea(otherProps) {
        const {field, rows = 15, cols = 100} = this.props;
        return <textarea
            className="ml-input__textarea"
            {...field.bind({...otherProps})}
            rows={rows}
            cols={cols}
        />;
    }

    render() {

        const {value, className, field, placeholder, type = 'text'} = this.props;
        // Fix https://fb.me/react-unknown-prop
        const otherProps = omit(this.props, [
            'field'
        ]);

        return (
            <div className={classNames('ml-input', className)}>
                {field.label ? <label
                    htmlFor={field.id}
                    className="ml-input__label"
                >
                    {field.label}
                </label> : ''}
                {type === 'textarea' ? this.renderTextArea(otherProps) : this.renderInput(otherProps)}
                {field.error ? <span className="ml-input__error">{field.error}</span> : ''}
            </div>

        );
    }


}