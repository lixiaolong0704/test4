import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import * as React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import { DropTarget } from 'react-dnd'
import ScSetting from "./ScSetting";
import PropTypes from 'prop-types'

const squareTarget = {
    canDrop(props) {
        return !!props.chapterId;
    },

    drop(props,monitor) {
        // moveKnight(props.chapterId)
        // this.props.onDrop(props.chapterId);
        if (props.onDrop) {
            props.onDrop(props, monitor)
        }
    },
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }
}

@DropTarget("TEST", squareTarget, collect)
@observer

export default class BgScSetting extends React.Component {

    static propTypes = {
        chapterId:PropTypes.string.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        children: PropTypes.node,

        onDrop: PropTypes.func
    }
    async componentDidMount() {


    }
    props:any

    renderOverlay(color) {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: color,
                }}
            />
        )
    }


    render() {

        const {   connectDropTarget, isOver, canDrop, children } = this.props

        return connectDropTarget(
            <span className='setting-chapters__target'>
                <ScSetting/>
                {isOver && !canDrop && this.renderOverlay('red')}
                {!isOver && canDrop && this.renderOverlay('yellow')}
                {isOver && canDrop && this.renderOverlay('green')}
            </span>

        );
    }


}