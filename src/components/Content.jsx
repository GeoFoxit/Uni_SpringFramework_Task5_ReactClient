import React, { Component } from 'react';
import Sign from './Sign';
import { Route } from 'react-router';
import Contacts from './Contacts';
import Compare from './Compare';
import Cart from './Cart';
import Favorite from './Favorite';
import Profile from './Profile';

class Content extends Component {

    render() {
        let component = !this.props.logged ? (()=><Sign sign={this.props.sign}/>) : (()=>(<Profile/>))

        return (
            <div className="mainContent">
                <Route exact path="/contacts" component={Contacts}/>
                <Route exact path="/compare" component={Compare}/>
                <Route exact path="/cart" component={Cart}/>
                <Route exact path="/favorite" component={Favorite}/>
                <Route exact path="/profile" render={component}/>
            </div>
        );
    }
}

export default Content;
