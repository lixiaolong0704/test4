import {observable, computed, autorun, action, runInAction, useStrict} from 'mobx';
import {asyncAction} from "mobx-utils";

export default class Auth {


    constructor() {
        // this.currentCommit={}
    }

    @observable userInfo: any = {username: ''}

    @computed
    get loggedIn() {
        return !!this.userInfo.username;
    }

    @action
    authenticate(userinfo) {

        this.userInfo.username = userinfo.username;
        // Object.assign(this.userInfo, userinfo);
        sessionStorage.setItem("userinfo", JSON.stringify(userinfo));
    }

    @action
    signout() {
        this.userInfo.username = ''
    }


}