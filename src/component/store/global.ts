import {observable, computed, autorun, action, runInAction, useStrict} from 'mobx';
import {asyncAction} from "mobx-utils";
import _ from "lodash";
import api from '../../api';

useStrict(true) // don't allow state modifications outside actions



export default class global {


    constructor() {
    }

    @observable isFoldLeftSideOfRead: boolean = false;
    @action
    setIsFoldLeftSideOfRead(isFoldLeftSideOfRead) {
        this.isFoldLeftSideOfRead =isFoldLeftSideOfRead;
    }




}