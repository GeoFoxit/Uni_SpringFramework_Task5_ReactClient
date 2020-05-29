import React, { Component } from 'react';
import Sign from './Sign';
import { Route } from 'react-router';
import Contacts from './Contacts';
import Compare from './Compare';
import Cart from './Cart';
import Favorite from './Favorite';
import Profile from './Profile';
import Catalogue from './Catalogue';
import GoodDetails from './GoodDetails';

class Content extends Component {

    render() {
        let component = !this.props.logged ? (()=><Sign sign={this.props.sign}/>) : (()=>(<Profile sign={this.props.sign}/>))
        return (
            <div className="mainContent">
                <Route exact path="/" component={Catalogue}/>
                <Route exact path="/contacts" component={Contacts}/>
                <Route exact path="/compare" component={Compare}/>
                <Route exact path="/cart" component={Cart}/>
                <Route exact path="/favorite" component={Favorite}/>
                <Route exact path="/details/:good_id" component={GoodDetails} />
                <Route exact path="/profile" render={component}/>
            </div>
        );
    }
}

export default Content;
