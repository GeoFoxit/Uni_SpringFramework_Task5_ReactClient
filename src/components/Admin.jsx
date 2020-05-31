import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Admin extends Component {
    state = {
        allPurchases: [],
        allUsers: [],
        list: []
    }

    componentDidMount() {
        //Load all purchases
        axios.get("http://192.168.1.103:8000/purchase")
        .then(data => data.data)
        .then(allPurchases => {
            this.setState({
                allPurchases
            })
        })
        .then(()=> 
            axios.get("http://192.168.1.103:8000/user", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token") 
                }
            })
        )
        .then(data => data.data)
        .then(allUsers => {
            this.setState({
                allUsers
            })
        })
        .then(() => {
            for (let i = 0; i < this.state.allPurchases.length; i++) {
                let curPurchase = this.state.allPurchases[i]
                let user = this.state.allUsers.find(user => parseInt(user.id) === parseInt(curPurchase.user_id))
                if (user === null || user === undefined) {
                    curPurchase.user_id = "ID: " + curPurchase.user_id
                    continue
                }
                curPurchase.user_id = user.name
            }
            this.setState({})
        })
        .catch(error => {
            alert("Sorry, error loading data!")
            console.log(error);
        })
    }

    doSearch = () => {
        const curVal = this.search.value
        const finded = this.state.allPurchases.filter(purchase => purchase.user_id.toLowerCase().includes(curVal.toLowerCase()))
        this.setState({
            list: finded
        })
    }

    render() {
        let list = []
        if (this.state.list.length === 0) {
            list = this.state.allPurchases
        } else {
            list = this.state.list
        }

        return (
            <div style={{"textAlign":"center"}}>
                <input placeholder="Search by username" onChange={this.doSearch} ref={node => this.search = node} type="text" />
                <table border="1">
                    <caption>
                        <h2>Purchases</h2>
                    </caption>
                    <tbody>
                        <tr>
                            <th>User</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Goods</th>
                        </tr>
                        {list.map(purchase => (
                            <tr key={purchase.id}>
                            <td>{purchase.user_id}</td>
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
        );
    }
}

export default Admin;
