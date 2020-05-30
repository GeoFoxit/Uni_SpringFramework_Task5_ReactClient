import React, { Component } from 'react';

class Sign extends Component {


    sign_in_handler = () => {
        const user = {
            email: this.sign_in_email.value,
            password: this.sign_in_pass.value
        }
        if (user.email === "" || user.password === "") {
            alert("Fill all the fields!")
            return;
        }
        this.props.sign.sign_in(user)
    }

    sign_up_handler = () => {
        const user = {
            name: this.sign_up_name.value,
            email: this.sign_up_email.value,
            password: this.sign_up_pass.value
        }
        if (user.name === "" || user.email === "" || user.password === "") {
            alert("Fill all the fields!")
            return;
        }
        this.props.sign.sign_up(user)
    }

    render() {
        return (
            <div className="content_container sign">
                <div className="sign_in">
                    <h2>Sign In</h2>
                    <div className="sign_form">
                        <input type="email" ref={(node) => this.sign_in_email = node} placeholder="E-mail"/>
                        <input type="password" ref={(node) => this.sign_in_pass = node} placeholder="Password"/>
                        <button onClick={this.sign_in_handler}>Submit</button>
                    </div>
                </div>
                <hr/>
                <div className="sign_up">
                    <h2>Sign Up</h2>
                    <div className="sign_form">
                        <input type="text" ref={(node) => this.sign_up_name = node} placeholder="Name"/>
                        <input type="email" ref={(node) => this.sign_up_email = node} placeholder="E-mail"/>
                        <input type="password" ref={(node) => this.sign_up_pass = node} placeholder="Password"/>
                        <button onClick={this.sign_up_handler}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sign;
