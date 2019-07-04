import React, {Component, Fragment} from 'react';
import Routes from './routes/mainRoute';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import SideMenu from './components/layout/sideMenu';
import {BrowserRouter} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <Header/>
                    <div id="main">
                        <div className="wrapper">
                            <section id="content">
                                <div className="container cards-container">
                                    <div className="row">
                                        <SideMenu/>
                                        <div className="col s11 appView">
                                            <Routes/>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <Footer/>
                </BrowserRouter>
            </Fragment>
        );
    }
}

export default App;
