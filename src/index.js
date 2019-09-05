import React from 'react';
import ReactDOM from 'react-dom';
// import Admin from './admin';
// import Home from './pages/router_demo/route1/Home';
import Router from './router';
// import App from './App';
import { Provider } from 'react-redux'
import configureStore from './redux/store/configureStore'

const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root'));


