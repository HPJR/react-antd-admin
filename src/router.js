import React,{ Component } from 'react';
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import App from './App';
import Admin from './admin';
import Home from './pages/Home'
import NoMatch from './pages/nomatch';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Loading from './pages/ui/loading';
import Notification from './pages/ui/notice';
import Message from './pages/ui/message';
import Tab from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import FromLogin from './pages/form/login';
import Register from './pages/form/register';

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
                                        <Route path="/ui/loadings" component={Loading}/>
                                        <Route path="/ui/notification" component={Notification}/>
                                        <Route path="/ui/messages" component={Message}/>
                                        <Route path="/ui/tabs" component={Tab}/>
                                        <Route path="/ui/gallery" component={Gallery}/>
                                        <Route path="/ui/carousel" component={Carousels}/>
                                        <Route path="/form/login" component={FromLogin}/>
                                        <Route path="/form/reg" component={Register}/>
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
