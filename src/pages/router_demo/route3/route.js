import React,{ Component } from 'react';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import Main from './Main';
import Info from './Info';
import About from '../route1/About';
import Topic from '../route1/Topic';
import Home from './Home'
import NoMatch from './NoMatch'

//组件与路由分离开发
export default class RouteHome extends Component{
    render(){
        return(
            <Router>
                <Home>
                    <Switch>
                        <Route path="/main" render={()=>
                            <Main>
                                <Route path="/main/:value" component={ Info }></Route>
                            </Main>
                        }></Route>
                        <Route path="/about" component={ About }></Route>
                        <Route path="/topics" component={ Topic }></Route>
                        <Route component={ NoMatch }></Route>
                    </Switch>

                </Home>
            </Router>
        )
    }
}
