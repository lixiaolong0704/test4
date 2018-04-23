import {observable, computed, runInAction, action} from 'mobx';
import {observer, Provider} from 'mobx-react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import * as React from 'react';
import {Scrollbars} from 'react-custom-scrollbars';
import {MRForm, Button, Input, MlModal, Icon, PerfectScrollbar} from 'ui/index';
import {DragSource} from 'react-dnd';
import PropTypes from 'prop-types';

var moli_logo  = require("assets/moli_logo.png");
const knightSource = {
    beginDrag(props, monitor, component) {
        return {
            pid: props.pid
        };
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    };
}

@DragSource('TEST', knightSource, collect)
@observer
export default class Paragraph extends React.Component {

    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDragPreview: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
    };

    props: any;

    async componentDidMount() {
        const { connectDragPreview } = this.props;
        const img = new Image();
        img.src = moli_logo;
        img.onload = () => connectDragPreview(img);
        // this.props.connectDragPreview(<div>fuck...</div>)

    }


    render() {
        const {connectDragSource, connectDragPreview, isDragging} = this.props;


        return connectDragSource(
            <p className='setting-chapters__paragraph'
               style={{
                   fontWeight: 'bold',
                   cursor: 'move',
                   opacity: isDragging ? 0.5 : 1,
               }}
            >
                {this.props.children}
            </p>
        )

    }


}