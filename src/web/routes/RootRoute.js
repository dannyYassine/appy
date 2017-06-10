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
import { PrivateRoute } from './PrivateRoute'
import HomeContainer from './../components/containers/HomeContainer'
import SettingsContainer from './../components/containers/SettingsContainer'

const Component404 = () => (
    <h1>404</h1>
)

export const RouterRoot = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/settings">Settings</Link></li>
            </ul>

            <Switch>
                <Route exact path="/" component={HomeContainer}/>
                <Route exact path="/settings" component={SettingsContainer}/>
                <Route component={Component404}/>
            </Switch>
        </div>
    </Router>
)