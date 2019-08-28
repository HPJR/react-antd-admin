import React,{ Component } from 'react';
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import App from './App';
import Admin from './admin';
import Home from './pages/Home'
import NoMatch from './pages/nomatch';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';

export default class IRouter extends Component{
    render(){
        return (
            <App>
                <HashRouter>
                    <Switch>
                        <Route path='/login' component={ Home }></Route>
                        <Route
                            path="/"
                            render={() => (
                                <Admin>
                                    <Switch>
                                        <Route path="/home" component={Home}/>
                                        <Route path="/ui/buttons" component={Buttons}/>
                                        <Route path="/ui/modals" component={Modals}/>
                                        {/*<Redirect to="/home"/>*/}
                                        <Route component={NoMatch}/>
                                    </Switch>
                                </Admin>
                            )}
                        />
                        <Route component={ NoMatch }></Route>
                    </Switch>
                </HashRouter>
            </App>
        )
    }
}
