import React from 'react'
import { NavLink } from 'react-router-dom';

import fblogo from './res/facebook.png';
import inlogo from './res/instagram.png';
import twlogo from './res/twitter.png'

const Footer = () => {
    return (
        <footer className="container-fluid">
            <div className="container-fluid row footer-content mx-auto">
                <div className="container-fluid col-xs-12 col-md-6 col-lg-4 mx-auto footer-img">
                </div>
                <div className="col-md-6 col-lg-8 row mx-auto footer-links" id="footer-links">
                    <div className="col-lg-6 mx-auto footer-col">
                        <div className="container-fluid">
                            <NavLink to='/aboutus'>
                                About Us
                            </NavLink>
                        </div>
                        <div className="container-fluid">
                            <NavLink to='/blog'>
                                Blog
                            </NavLink>
                        </div>
                        <div className="container-fluid">
                            <NavLink to='/breweries'>
                                Breweries
                            </NavLink>
                        </div>
                        <div className="container-fluid">
                            <NavLink to='/events'>
                                Events
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
                    <div className="col-lg-6 mx-auto footer-col">
                        <div className="container-fluid mb-3">
                        <a href='https://www.facebook.com'>Follow us on <img src={fblogo} alt="Facebook" width="30" height="30"/>&nbsp;&nbsp;&nbsp;</a>
                        </div>
                        <div className="container-fluid mb-3">
                        <a href='https://www.instagram.com'>Follow us on <img src={inlogo} alt="Instagram" width="30" height="30"/>&nbsp;&nbsp;&nbsp;</a>
                        </div>
                        <div className="container-fluid mb-3">
                        <a href='https://www.twitter.com'>Follow us on <img src={twlogo} alt="Twitter" width="30" height="30"/>&nbsp;&nbsp;&nbsp;</a>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;