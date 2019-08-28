import React,{ Component } from 'react';
import {Link} from 'react-router-dom';

export default class  Home extends Component{
    render(){
        return(
            <div>
                这里是测试动态路由参数：
                { this.props.match.params.value }
            </div>
        )
    }
}
