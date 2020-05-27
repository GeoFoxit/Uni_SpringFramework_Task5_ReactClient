import React, { Component } from 'react';

class Profile extends Component {
    logOut = () => {
        localStorage.removeItem('user');
        this.props.sign.sign_out();
    }

    render() {
        const localUser = localStorage.getItem('user');
        let user = JSON.parse(localUser);
        return (
            <div className="profile">
                <span>Welcome {user.name}!</span>
                <span>Your e-mail - {user.email}</span>
                <span>Your id - {user.id}</span>
                <button onClick={this.logOut}>Sign out</button>
            </div>
        );
    }
}

export default Profile;
