import './Icon.scss';

import * as React from 'react';
import classnames from 'classnames';
import omit from 'omit.js';
export default class Icon extends React.Component {



    async componentDidMount() {

    }

    props:any|{
        svgId:string
    }

    render() {
        const otherProps = omit(this.props, [
            'svgId',
            'className'
        ]);
        const Xx =require(`assets/svg/${this.props.svgId}.svg`);
        return <span className={classnames('ml-icon')} {...otherProps}><Xx></Xx></span> ;
    }


}