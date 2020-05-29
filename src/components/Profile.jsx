import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchaseList: []
        }
    }
    

    logOut = () => {
        localStorage.removeItem('user');
        this.props.sign.sign_out();
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"))

        axios.get("http://127.0.0.1:8002/")
        .then(data => {
            return data.data.filter(purchase => parseInt(purchase.user_id) === parseInt(user.id))
        })
        .then(purchaseList => {
            this.setState({
                purchaseList
            })
        })
    }

    render() {
        const localUser = localStorage.getItem('user');
        let user = JSON.parse(localUser);

        const listToDisplay = this.state.purchaseList.length === 0 ? null : (
            <div className="profile_userPurchases">
                <table border="1">
                    <caption>
                        <h2>Purchases</h2>
                    </caption>
                    <tbody>
                        <tr>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Goods</th>
                        </tr>
                        {this.state.purchaseList.map(purchase => (
                        <tr key={purchase.id}>
                            <td>{purchase.sum} $</td>
                            <td style={purchase.status === "done" ? {"backgroundColor":"#d0ffbf"} : {"backgroundColor":"#fff4bf"}}>{purchase.status}</td>
                            <td>
                                {JSON.parse(purchase.goods_ids).map(good => {
                                    return (
                                        <Link key={good} to={"/details/"+good}>Good #{good}<br/></Link>
                                    )
                                })}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
        return (
            <div className="profile">
                <div className="profile_details">
                    <h2 style={{"textAlign":"center"}}>Profile</h2>
                    <span>Welcome {user.name}!</span>
                    <span>Your e-mail - {user.email}</span>
                    <span>Your id - {user.id}</span>
                    <button onClick={this.logOut}>Sign out</button>
                </div>
                {listToDisplay}
            </div>
        );
    }
}

export default Profile;
