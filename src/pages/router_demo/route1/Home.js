import React,{ Component } from 'react';
import {HashRouter,Route,Link,Switch} from 'react-router-dom';
import Main from './Main';
import About from './About';
import Topic from './Topic';

//组件与路由混合开发
export default class  Home extends Component{
    render(){
        return(
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/topics">Topics</Link>
                        </li>
                    </ul>
                    {/*switch 匹配一个，只有一个匹配后，剩余不执行，
                      * exact 精准匹配，不加，组件Main 一直在页面，/about 解析成"/"和"about"两个路由
                      */}
                    <Switch>
                        <Route exact={true} path="/" component={ Main }></Route>
                        <Route path="/about" component={ About }></Route>
                        <Route path="/topics" component={ Topic }></Route>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}
