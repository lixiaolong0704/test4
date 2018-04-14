import './Input.scss';

import * as React from 'react';

export default class Input extends React.Component {


    async componentDidMount() {

    }

    props:{
        children?:any,
        type?:string
    }

    render() {


        return (
            <input className='ml-input' />
        );
    }


}