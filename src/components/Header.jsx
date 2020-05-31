import React from 'react';
import profile_img from '../img/profile.png';
import cart_img from '../img/cart.png';
import compare_img from '../img/compare.png';
import {Link} from 'react-router-dom';


const Header = (props) => (
    <div className="header">
        <div className="logo">
            <Link exact="exact" to="/">
                <h1>Dominus</h1>
            </Link>
        </div>
        <div className="nav">
            <Link exact="exact" to="/compare">
                <div className="nav-button">
                    <img src={compare_img} alt=""/><br/>
                    <span>Compare</span><br/>
                </div>
            </Link>
            <Link exact="exact" to="/cart">
                <div className="nav-button">
                    <img src={cart_img} alt=""/><br/>
                    <span>Cart</span><br/>
                </div>
            </Link>
            <Link excit="excit" to="/profile">
                <div className="nav-button">
                    <img src={profile_img} alt=""/><br/>
                    <span>{props.user.name}</span><br/>
                </div>
            </Link>
        </div>
    </div>
);

export default Header;
