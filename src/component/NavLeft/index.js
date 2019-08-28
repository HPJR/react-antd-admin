import React,{ Component } from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import menuConfig from '../../config/menuConfig'
import './index.less';

const { SubMenu } = Menu;
export default class NavLeft extends Component {
    //数据引入
    componentWillMount(){
        const menuTreeNode = this.renderMenu(menuConfig);
        this.setState({
            menuTreeNode
        })
    }
    state = {
        //默认展开
        openKeys: [],
        theme: 'dark',
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
                     <SubMenu key={item.key} title={item.title}>
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
