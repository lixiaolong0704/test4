const httpbase = 'http://localhost:4000';
import axios from 'axios';
import cookie from './utilities/cookie';

function setup() {

}

setup();

const instance = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 5000,
    withCredentials:true
});
instance.interceptors.request.use(function (config) {

    var sid= cookie.get("connect.sid");
    if(sid){
        console.log(sid);
    }


    // if (type == 'share') {
    //     config.headers['ShareAccessToken'] = cookieUtils.get("shareAccessToken");
    // } else {
    //     // config.headers['Token'] = cookieUtils.get("sid") || localStorage.getItem('sid');
    // }
    //
    //
    // // config.url  += config.url +"?access_token="+"dsdfsdfsdfsdf";
    // // config.withCredentials =true;
    // // config.headers['Access-Control-Allow-Origin']= "*";
    // let currentSpaceId = localStorage.getItem('DATADECK_CURRENT_SPACE_ID');
    // if(currentSpaceId) {
    //     // config.headers['SpaceId'] = currentSpaceId;
    // }
    // const accessToken = cookieUtils.get("token");
    // const tid = cookieUtils.get('tid');
    // if (tid) config.headers['tid'] = tid;
    // config.headers['token'] = accessToken;
    // config.headers['Accept-Language'] = utils.getLocalLang().locale;
    // console.log("eeeeee---"+config.url+"--"+config.method);
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    if(response.data.code ===-2){
        alert("超时了！");
    }
    // var config = response.config;
    // // 进行缓存
    // if (config.cache && config.method == 'GET') {
    //     var cacheKey = cache.generateKey(config);
    //     cache.set(cacheKey, response.data.data);
    // }
    return response.data;
}, function (error) {
    return Promise.reject(error);
});
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;


var wraper:any={};
const methods = [ 'options', 'get', 'post' ]
methods.forEach(method =>  {


    wraper[method] = function () {

        var args= arguments;
        return new Promise((r)=>{

            instance[method].apply(instance,args).then((rst)=>{
                r(rst);
            })


        });

    }


});

export default wraper;