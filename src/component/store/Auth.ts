import {observable, computed, autorun, action, runInAction, useStrict} from 'mobx';

useStrict(true);
import {asyncAction} from 'mobx-utils';
import api from '../../api';
import cookie from '../../utilities/cookie';

export default class Auth {


    constructor() {
        // this.currentCommit={}
    }
    // @observable checkLogin:boolean=false

    @observable userInfo: any = null;

    @computed
    get loggedIn() {
        return !!this.userInfo;
    }

    @action
    async autoLogin() {

        if(!this.userInfo){
            let rst = await api.get('/users/getUserInfo');
            runInAction(() => {
                if(rst.data.code===1){
                    this.userInfo = rst.data.data;
                }
            });
            return rst;
        }



    }


    @action
    authenticate(userinfo) {

        this.userInfo = userinfo;
        // this.checkLogin =true;
        // Object.assign(this.userInfo, userinfo);
        sessionStorage.setItem('userinfo', JSON.stringify(userinfo));
    }

    @action
    async signout() {
        var _t=this;
        let rst = await api.get('/users/signout');
        if(rst.data.code===1){
            runInAction(() => {
                _t.userInfo = null
            });

        }

    }


}