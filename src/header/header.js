import React from 'react';
import { NavLink } from "react-router-dom";

const Header = ()=>{
    return (
        <nav className="navbar navbar-expand-md navbar-dark">

        <div className="navbar-collapse collapse w-100 dual-collapse2 order-1 order-md-0">
            <ul className="navbar-nav ml-auto text-center ">
                <li className="nav-item mx-2">
                    <NavLink exact className="nav-link" to="#">About Us</NavLink>
                </li>
                <li className="nav-item mx-2">
                    <NavLink exact className="nav-link" to="#">Blog</NavLink>
                </li>
                <li className="nav-item mx-2">
                    <NavLink exact className="nav-link" to="/breweries">Breweries</NavLink>
                </li>
            </ul>
        </div>

        <div className="container-fluid my-2 order-0 order-md-1 position-relative">
            <button className="navbar-toggler mr-0 " type="button" data-toggle="collapse" data-target=".dual-collapse2">
                <span className="navbar-toggler-icon "></span>
            </button>
            <NavLink id="navbar-brand" className="mx-auto" to="/">
                <img src="./res/titleimg.png" className="rounded-circle"/>
            </NavLink>
        </div>

        <div className="navbar-collapse collapse w-100 dual-collapse2 order-2 order-md-2">
            <ul className="navbar-nav mr-auto text-center">
                <li className="nav-item mx-2">
                    <NavLink exact className="nav-link" to="#">Events</NavLink>
                </li>
                <li className="nav-item mx-2">
                    <NavLink exact className="nav-link" to="#">Contact</NavLink>
                </li>
                <li className="nav-item">
                    <div className="nav-link">
                        <a href='#'>FB&nbsp;&nbsp;&nbsp;</a>
                        <a href='#'>IG&nbsp;&nbsp;&nbsp;</a>
                        <a href='#'>TW</a>
                    </div>

                </li>
            </ul>
        </div>
    </nav>
    );
}

export default Header;