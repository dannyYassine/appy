/**
 * Created by dannyyassine on 2017-04-25.
 */
// import React from 'react'
// import LocalStateDataManager from '../middlewares/persistStateLocalManager';
// import {
//     Route,
//     Redirect
// } from 'react-router-dom'
//
// export const PrivateRoute = ({path, component}) => (
//     <Route path={path} render={(props) => (
//         LocalStateDataManager.loadToken() !== null ? (
//             React.createElement(component, {})
//         ) : (
//             <Redirect to={{
//                 pathname: '/login',
//                 state: {from: props.location}
//             }}/>
//         )
//     )}/>
// )