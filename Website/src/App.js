import React from 'react';
import Home from './home/home'
import Breweries from './brewery/breweries';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Header from './header/header';
import Footer from './footer/footer';
import './app.css'

import dotenv from 'dotenv'
import Events from './events/events';
import MonthEvents from './monthEvents/monthEvents';
import AboutUs from './aboutUs/aboutUs';
import ContactUs from './contactUs/ContactUs';
dotenv.config();

const App = () => {

    return (
        <Router> 
            <>
                <Header />
                <Route path="/breweries" exact>
                    <Breweries />
                </Route>

                <Route path="/events" exact>
                    <Events />
                </Route>

                <Route path="/events/:month" exact>
                    <MonthEvents />
                </Route>

                <Route path="/aboutus" exact>
                    <AboutUs />
                </Route>

                <Route path="/contactus" exact>
                    <ContactUs />
                </Route>

                <Route path="/" exact>
                    <Home />
                </Route>
                <Footer />
            </>
        </Router>
    );
}

export default App;