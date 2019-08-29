import JsonP from 'jsonp'
import axios from 'axios'

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

}
