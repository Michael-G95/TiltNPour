import React from 'react';
import Home from './home/home'
import Breweries from './brewery2/breweries';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Header from './header/header';
import Footer from './footer/footer';
import './app.css'

import dotenv from 'dotenv'
dotenv.config();

const App = () => {

    return (  
        <Router>
            <>
                <Header />
                <Switch>
                    <Route path="/breweries">
                        <Breweries />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
                <Footer />
            </>
        </Router>
    );
}

export default App;