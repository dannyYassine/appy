/**
 * Created by dannyyassine on 2017-04-25.
 */
import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute';
import HomeContainer from './../components/containers/HomeContainer';
import SettingsContainer from './../components/containers/SettingsContainer';
import AddProjectContainer from './../components/containers/AddProjectContainer';
import ProjectDetailsContainer from './../components/containers/ProjectDetailsContainer';

const Component404 = () => (
    <h1>404</h1>
);

export const RouterRoot = () => (
    <Router>
        <div>
            <div>
                <ul className="nav-bar">
                    <li>
                        <div className="nav-a"><Link to="/">Home</Link></div>
                    </li>
                    <li>
                        <div className="nav-a"><Link to="/settings">Settings</Link></div>
                    </li>
                </ul>
            </div>
            <div className="content">
                <Switch>
                    <Route exact path="/" component={HomeContainer}/>
                    <Route exact path="/settings" component={SettingsContainer}/>
                    <Route path="/projects/add" component={AddProjectContainer}/>
                    <Route path="/project/:project_id" component={ProjectDetailsContainer}/>
                    <Route component={Component404}/>
                </Switch>
            </div>
        </div>
    </Router>
);