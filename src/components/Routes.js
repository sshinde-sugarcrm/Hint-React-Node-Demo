import React, {Component} from 'react';
import {Route,Router, Switch} from 'react-router-dom';
import Login from "./Login";
import Welcome from "./Welcome";
import Home from "./Home";
import '../App.css';
import history from "./history";

class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route  path='/login' component={Login}/>
                    <Route  path='/welcome' component={Welcome}/>
                </Switch>
            </Router>
        );
    }
}
export default Routes;