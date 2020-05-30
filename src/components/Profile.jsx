import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

class Profile extends Component {
    
    state = {
        purchaseList: []
    }

    componentDidMount() {

        axios.get("http://192.168.1.103:8000/purchase")
        .then(data => data.data.filter(purchase => parseInt(purchase.user_id) === parseInt(this.props.user.id)))
        .then(purchaseList => {
            this.setState({
                purchaseList
            })
        })
        .catch(error => {
            alert("Sorry, error loading purchases!")
            console.log(error);
        })
    }

    render() {
        const user = this.props.user;

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
                    <span>Your email - {user.email}</span>
                    <span>Your id - {user.id}</span>
                    <button onClick={this.props.sign.sign_out}>Sign out</button>
                </div>
                {listToDisplay}
            </div>
        );
    }
}

export default Profile;
