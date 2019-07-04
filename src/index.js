import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import '../public/assets/sass/style.scss';
import AppLayout from './appLayout';
import history from './helpers';
import store from './helpers/store';
import 'materialize-css';

const root = document.getElementById('root');

const renderApp = () => {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <AppLayout history={history}/>
            </BrowserRouter>
        </Provider>
        , root,
    );
};

renderApp();
