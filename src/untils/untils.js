import React from 'react'
import {Select} from 'antd'
const Option = Select.Option;

export default {
    formateData(time){
        if(!time) return '';
        let data = new Date(time);
        return data.getFullYear() + "-" + (data.getMonth()+1) + "-" + data.getDate() + "  " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    },
    //分页
    pagination(data,callback){
        return {
            onChange: (current) => {
                callback(current)
            },
            current: data.firstRow,
            pageSize: data.listRows,
            total: data.total,
            showTotal: () => {
                return  `共${data.total}条`
            },
            showQuickJumper: true
        }
    },
    //创建option
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = [];
        data.map((item) => {
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        });
        return options;
    },
}
