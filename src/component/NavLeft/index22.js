import React,{ Component } from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import menuConfig from '../../config/menuConfig'
import {connect} from 'react-redux'  //连接器
import { switchMenu } from './../../redux/action' //事件行为

import './index.less';

const { SubMenu } = Menu;
class NavLeft extends Component {
    state = {
        //默认展开
        openKeys: [],
        theme: 'dark',
    };

    //数据引入
    componentWillMount(){
        const menuTreeNode = this.renderMenu(menuConfig);
        let currentKey = window.location.hash.replace(/#|\?.*$/g, '');
        console.log(currentKey);
        this.setState({
            currentKey,
            menuTreeNode
        })
    }

    //导航增加背景/触发action事件
    handleClick = (item, key) => {
        console.log(item);
        console.log(key);
        const { dispatch } = this.props;
        //触发事件传值
        // dispatch(switchMenu(item.props.title));
        this.setState({
            currentKey: item.key
        })
    };

    //需要展开的key数组
    rootSubmenuKeys(){
        let navArr = [];
        menuConfig.map((item)=>{
           if(item.children){
               navArr.push(item.key);
           }
        });
        return navArr;
    };
    //手风琴展开切换
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys().indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };
    //菜单渲染
    renderMenu = data => {
         return data.map((item)=> {
             if (item.children){
                 return(
                     <SubMenu key={item.key} title={item.title} zop={item.title}>
                         {this.renderMenu(item.children)}
                     </SubMenu>
                 )
             }
             return(
                 <Menu.Item key={item.key} title={ item.title  }>
                     <NavLink to={ item.key }>{ item.title }</NavLink>
                 </Menu.Item>
             )
         })
    };

    render(){
        return(
            <div>
                <div className='logo'>
                    <img src="assets/antLogo.svg" alt="ant Design"/>
                    <h1>Ant Design</h1>
                </div>
                <Menu
                    onClick={ this.handleClick }
                    selectedKeys={ [this.state.currentKey] }
                    theme={ this.state.theme }
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}>
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        )
    }
}


export default connect()(NavLeft)
