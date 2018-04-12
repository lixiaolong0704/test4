import * as React from 'react';
import './index.scss';
import ClickOutside from 'react-click-outside';
export default class DropdownApple extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    componentDidMount() {


    }
    btnClick(){
        this.setState({
            isOpen : !this.state.isOpen
        })
    }
    close(){
        this.setState({isOpen:false});
    }
    state: any;
    props: {
        button: any,
        children: any
    };


    render() {


        return (
            <ClickOutside onClickOutside={this.close.bind(this)}  className='dropdown-apple'>
                <div className='dropdown-apple__button ' onClick={this.btnClick.bind(this)}>{this.props.button}</div>
                {this.state.isOpen ? <div  className='dropdown-apple__panel'>
                    {this.props.children}
                </div> : ''}
            </ClickOutside>
        );
    }


}