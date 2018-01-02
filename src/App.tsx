import * as React from 'react';
import './App.css';
import 'antd/dist/antd.css';


import {Button} from 'antd';
// const logo = require('./logo.svg');
import {observable, computed} from 'mobx';

import Fragment from './component/fragment';

// import  {} from 'draft-js';
class OrderLine {
    @observable price = 0;
    @observable amount = 1;

    @computed
    get total() {
        return this.price * this.amount;
    }
}


var a = new OrderLine();

var testHtml = `
    <div>
     <div>fuck you ok ?</div>
     <div>not ok cc mm</div>
    
</div>
    

`;


class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        // this.state = {editorState: EditorState.createEmpty()};
        // this.onChange = (editorState:any) => this.setState({editorState});

    }



    render() {


        return (
            <div className="app">


                <div className="app__side"></div>

                {/*<div className="App-header">*/}


                    {/*<div dangerouslySetInnerHTML={{__html: testHtml}}></div>*/}
                    {/*<Button type="primary">fuck</Button>*/}
                    {/*<h2>Welcome to React2222</h2>*/}
                {/*</div>*/}
                <div className="app__main">

                    <Fragment></Fragment>


                </div>

            </div>
        );
    }
}



export default App;
