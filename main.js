import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Info from './views/info'
import Shows from './views/shows'
import { HashRouter, Route } from 'react-router-dom';


ReactDOM.render((
    <HashRouter>
        <App>
            <Route exact path="/" component={Info} />
            <Route path="/info" component={Info} />
            <Route path="/shows" component={Shows} />      
        </App>
    </HashRouter>
), document.getElementById('app'))