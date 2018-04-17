import * as React from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
// import 'perfect-scrollbar/css/perfect-scrollbar.css';
import './perfect-scrollbar.css';
// import 'perfect-scrollbar/css/perfect-scrollbar.css';


export default class PerfectScrollbarApple extends React.Component {


    sbar: any = null;
    ps: any = null;
    props:any
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.ps = new PerfectScrollbar(this.sbar, {
            wheelPropagation: true,
            suppressScrollX: true,
            minScrollbarLength: 20
        });
    }

    init(){
        // setTimeout(() => {
        //     this.ps = new PerfectScrollbar(this.sbar, {
        //         wheelPropagation: true,
        //         suppressScrollX: true,
        //         minScrollbarLength: 20
        //     });
        //     // this.ps.update();
        //
        // });

    }


    render() {
        return (
            <div {...this.props} ref={(sbar) => this.sbar = sbar}>
                {this.props.children}
            </div>
        );
    }


}