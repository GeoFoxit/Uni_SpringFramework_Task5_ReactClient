import React, { Component } from 'react';

class Sign extends Component {


    sign_in_handler = () => {
        this.props.sign.sign_in(this.sign_in_email.value, this.sign_in_pass.value)
        .then(isOk => {
            if (!isOk) {
                alert("Invalid email or password!")
            }
        })
    }

    sign_up_handler = () => {
        if (this.sign_up_pass.value !== this.sign_up_rep_pass.value) {
            alert("Fields 'password' and 'repeat password' are not equal!");
            return;
        }
        this.props.sign.sign_up(this.sign_up_name.value, this.sign_up_email.value, this.sign_up_pass.value)
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
                        <input type="password" ref={(node) => this.sign_up_rep_pass = node} placeholder="Repeat password"/>
                        <button onClick={this.sign_up_handler}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sign;
