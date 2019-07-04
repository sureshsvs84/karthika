import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Dashboard from '../views/dashboard';
import NotFound from './../views/404/notFound';
import CustomerDetails from '../views/customerDetails';
import Settings from "../views/settings"
import Masters from '../views/masters/masters';

const Routes = () => (
    <Switch>
        <Route exact path='/' component={(props) => <Dashboard {...props} category={"Live"}/>}/>
        <Route exact path="/customer" key="create-project" component={CustomerDetails}/>
        <Route exact path="/customerdetails" key="view-edit-project" component={CustomerDetails}/>
        <Route exact path="/live" key="live-customers"
               component={(props) => <Dashboard {...props} category={"Live"}/>}/>
        <Route exact path="/demo" key="demo-customers"
               component={(props) => <Dashboard {...props} category={"Demo"}/>}/>
        <Route exact path="/competitors" key="competitors-customers"
               component={(props) => <Dashboard {...props} category={"Competitor"}/>}/>
        <Route exact path="/non-controlled" key="non-controlled-customers"
               component={(props) => <Dashboard {...props} category={"Non-Controlled Live"}/>}/>
        <Route exact path="/unpublished" key="unpublished-customers"
               component={(props) => <Dashboard {...props} category={"unpublished"}/>}/>
        <Route exact path="/settings" key="settings" component={Settings}/>
        <Route exact path="/masters" key="masters" component={Masters}/>
        <Route path="*" component={NotFound}/>
    </Switch>
);

export default Routes;