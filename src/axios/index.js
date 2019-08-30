import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';

export default class Axios {
        //jsonp 获取天气
        static jsonp(options){
            return new Promise((resolve,reject)=>{
                JsonP(options.url,{
                    param:'callback'
                },function (err,response) {
                    if(response.status === 'success' || response.status.code === 200  ){
                        resolve(response)
                    }else {
                        reject(response.message)
                    }
                })
            })
        }

        //mock 数据获取
        static ajax(option){

            //全局loading显示
            let loading;
            if(option.data && option.data.isShowLoading !== false){
                loading = document.getElementById('ajaxLoading');
                loading.style.display = 'block';
            }

            let baseApi = "https://easy-mock.com/mock/5d687968cf15ca6fdd476db6/reactadmin";
            return new Promise((resolve,reject)=>{
                axios({
                    url:option.url,
                    method:'get',
                    baseURL:baseApi,
                    timeout:5000,
                    params:(option.data && option.data.params) || ''
                }).then((response)=>{
                    //全局loading隐藏
                    if(option.data && option.data.isShowLoading !== false){
                        loading = document.getElementById('ajaxLoading');
                        loading.style.display = 'none';
                    }

                    if(response.status == '200'){
                        let res = response.data;
                        if(res.code === 0){
                            resolve(res);
                        }else{
                            Modal.info({
                                title:"提示",
                                content:res.msg
                            })
                        }
                    }else{
                        reject(response.data);
                    }
                })
            })
        }

}
