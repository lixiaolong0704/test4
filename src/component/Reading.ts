import {observable, computed, autorun,action} from 'mobx';

interface iCommit{
    _id:string,
    text:string,
    commit:string
}

export default class Reading {


    constructor(){
        // this.currentCommit={}
    }

    @action setCurrent(text:string){
        this.currentCommit.text=text
        this.currentCommit.commit='ffff';
    }

    @observable currentCommit:iCommit={
        _id:'',
        text:'',
        commit:''
    }



}