import React from "react";
import ReactDOM from "react-dom";

/* Page Imports */
import Dashboard from './js/pages/Dashboard/dashboard';

// Router Imports
import {BrowserRouter as Router, Route} from 'react-router-dom';

import 'css/index.css';
import 'css/normalize.css';

const App = () => {
	return (
        <Router>
            <Route exact path="/" component={Dashboard} />
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));