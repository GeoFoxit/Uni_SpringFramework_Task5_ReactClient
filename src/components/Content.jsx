import React, { Component } from 'react';
import Sign from './Sign';
import { Route } from 'react-router';
import Compare from './Compare';
import Cart from './Cart';
import Profile from './Profile';
import Catalogue from './Catalogue';
import GoodDetails from './GoodDetails';
import Admin from './Admin';
import AddGood from './AddGood'
import EditGood from './EditGood'

class Content extends Component {

    render() {
        let component = !this.props.user ? (()=><Sign sign={this.props.sign}/>) : this.props.user.role === "ROLE_ADMIN" ? (()=>(<Admin/>)) : (()=>(<Profile user={this.props.user} sign={this.props.sign}/>))
        return (
            <div className="mainContent">
                <Route exact path="/" user={this.props.user} component={Catalogue}/>
                <Route exact path="/compare" component={Compare}/>
                <Route exact path="/cart" component={Cart}/>
                <Route exact path="/details/:good_id" component={GoodDetails} />
                <Route exact path="/profile" render={component}/>
                <Route exact path="/addgood" component={AddGood}/>
                <Route exact path="/edit/:good_id" component={EditGood}/>
            </div>
        );
    }
}

export default Content;
