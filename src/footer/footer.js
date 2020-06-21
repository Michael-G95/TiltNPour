import React from 'react'
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="container-fluid">
            <div className="container-fluid row footer-content mx-auto">
                <div className="container-fluid col-xs-12 col-md-6 col-lg-4 mx-auto footer-img">
                </div>
                <div className="col-md-6 col-lg-8 row mx-auto footer-links" id="footer-links">
                    <div className="col-lg-6 mx-auto footer-col">
                        <div className="container-fluid">
                            <NavLink to='#'>
                                About Us
                        </NavLink>
                        </div>
                        <div className="container-fluid">
                            <NavLink to='#'>
                                Blog
                        </NavLink>
                        </div>
                        <div className="container-fluid">
                            <NavLink to='#'>
                                Breweries
                        </NavLink>
                        </div>
                        <div className="container-fluid">
                            <NavLink to='#'>
                                Events
                        </NavLink>
                        </div>
                    </div>
                    <div className="col-lg-6 mx-auto footer-col">
                        <div className="container-fluid">
                            <NavLink to='#'>
                                Facebook
                        </NavLink>
                        </div>
                        <div className="container-fluid">
                            <NavLink to='#'>
                                Twitter
                        </NavLink>
                        </div>
                        <div className="container-fluid">
                            <NavLink to='#'>
                                Instagram
                        </NavLink>
                        </div>
                        <div className="container-fluid">
                            <NavLink to='#'>
                                Privacy Policy
                        </NavLink>
                        </div>
                        <div className="container-fluid">
                            <NavLink to='#'>
                                Terms
                        </NavLink>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;