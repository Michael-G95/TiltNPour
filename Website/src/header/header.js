import React from 'react';
import { NavLink } from "react-router-dom";
import fblogo from './res/facebook.png';
import inlogo from './res/instagram.png';
import twlogo from './res/twitter.png'
const Header = ()=>{
    return (
        <nav className="navbar navbar-expand-md navbar-dark">

        <div className="navbar-collapse collapse w-100 dual-collapse2 order-1 order-md-0">
            <ul className="navbar-nav ml-auto text-center ">
                <li className="nav-item mx-2" data-toggle="collapse" data-target=".navbar-collapse.show">
                    <NavLink exact className="nav-link" to="#">About Us</NavLink>
                </li>
                <li className="nav-item mx-2" data-toggle="collapse" data-target=".navbar-collapse.show">
                    <NavLink exact className="nav-link" to="#">Blog</NavLink>
                </li>
                <li className="nav-item mx-2" data-toggle="collapse" data-target=".navbar-collapse.show">
                    <NavLink exact className="nav-link" to="/breweries">Breweries</NavLink>
                </li>
            </ul>
        </div>

        <div className="container-fluid my-2 order-0 order-md-1 position-relative" data-toggle="collapse" data-target=".navbar-collapse.show">
            <button className="navbar-toggler mr-0 " type="button" data-toggle="collapse" data-target=".dual-collapse2">
                <span className="navbar-toggler-icon "></span>
            </button>
            <NavLink id="navbar-brand" className="mx-auto" to="/">
                <img src="./res/titleimg.png" className="rounded-circle" alt=""/>
            </NavLink>
        </div>

        <div className="navbar-collapse collapse w-100 dual-collapse2 order-2 order-md-2">
            <ul className="navbar-nav mr-auto text-center">
                <li className="nav-item mx-2" data-toggle="collapse" data-target=".navbar-collapse.show">
                    <NavLink exact className="nav-link" to="#" >Events</NavLink>
                </li>
                <li className="nav-item mx-2" data-toggle="collapse" data-target=".navbar-collapse.show">
                    <NavLink exact className="nav-link" to="#">Contact</NavLink>
                </li>
                <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show">
                    <div className="nav-link">
                        <a href='https://www.facebook.com'><img src={fblogo} alt="Facebook" width="30" height="30"/>&nbsp;&nbsp;&nbsp;</a>
                        <a href='https://www.instagram.com'><img src={inlogo} alt="Instagram" width="30" height="30"/>&nbsp;&nbsp;&nbsp;</a>
                        <a href='https://www.twitter.com'><img src={twlogo} alt="Twitter" width="30" height="30"/>&nbsp;&nbsp;&nbsp;</a>
                    </div>

                </li>
            </ul>
        </div>
    </nav>
    );
}

export default Header;