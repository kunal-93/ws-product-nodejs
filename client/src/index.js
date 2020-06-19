import React from "react";
import ReactDOM from "react-dom";

/* Page Imports */
import Dashboard from './js/pages/dashboard/dashboard';
import GraphView from './js/pages/graphView';
import tableView from './js/pages/tableView';

// Router Imports
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import 'css/index.css';
import 'css/normalize.css';

const App = () => {
	return (
        <Router>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/graphView" component={GraphView} />
                <Route path="/tableView" component={tableView} />
            </Switch>  
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));