import React, { Component } from 'react';
import contacts_img from '../img/phone.png';
import profile_img from '../img/profile.png';
import cart_img from '../img/cart.png';
import like_img from '../img/like.png';
import compare_img from '../img/compare.png';


class Header extends Component {
    
    render() {
        return (
            <div className="header">
                <div>
                    <h1>Dominus</h1>
                </div>
                <div>
                    <div>
                        <img src={contacts_img} alt=""/><br/>
                        <span>Contacts</span><br/>
                    </div>
                    <div>
                        <img src={compare_img} alt=""/><br/>
                        <span>Compare</span><br/>
                    </div>
                    <div>
                        <img src={cart_img} alt=""/><br/>
                        <span>Cart</span><br/>
                    </div>
                    <div>
                        <img src={like_img} alt=""/><br/>
                        <span>Favorite</span><br/>
                    </div>
                    <div>
                        <img src={profile_img} alt=""/><br/>
                        <span>Profile</span><br/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
