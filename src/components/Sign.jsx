import React, { Component } from 'react';

class Sign extends Component {
    render() {
        const {sign_in, sign_out, sign_up} = this.props.sign;

        return (
            <div className="sign">
                <div>
                    <h2>Sign In</h2>
                    <input type="email" name="" id="" placeholder="E-mail"/>
                    <input type="password" name="" id="" placeholder="Password"/>
                    <button onClick={sign_in}>Submit</button>
                </div>
                <hr/>
                <div>
                    <h2>Sign Up</h2>
                    <input type="text" name="" id="" placeholder="Name"/>
                    <input type="email" name="" id="" placeholder="E-mail"/>
                    <input type="password" name="" id="" placeholder="Password"/>
                    <input type="password" name="" id="" placeholder="Repeat password"/>
                    <button onClick={sign_up}>Submit</button>
                </div>
            </div>
        );
    }
}

export default Sign;
