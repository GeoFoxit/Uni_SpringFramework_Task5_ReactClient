import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

class Cart extends Component {
    state = {
        goodsInCart: []
    }

    componentDidMount() {
        
        const cartInStorage = localStorage.getItem("cart")
        
        if (cartInStorage === null || cartInStorage === "") {
            localStorage.setItem("cart", JSON.stringify([]))
            return;
        }

        const goodList = JSON.parse(cartInStorage)
        
        let result = []
        for (let i = 0; i < goodList.length; i++) {
            axios.get(`http://192.168.1.103:8000/good/${goodList[i]}`)
            .then(res => {
                result.push(res.data)
            })
            .then(()=>{
                this.setState({goodsInCart: result})
            })
            .catch(res => {
                alert("Sorry, error loading cart.")
                console.log(res);
                this.setState({goodsInCart: []})
                return;
            })
        } 
    }

    purchase = () => {
        const priceList = this.state.goodsInCart.map(good => parseFloat(good.price))
        const sum = priceList.reduce((sum, curVal) => sum + curVal)

        if (localStorage.getItem("user") === "" || localStorage.getItem("user") === null) {
            alert("You must be logged!")
            return;
        }

        const data = {
            user_id: JSON.parse(localStorage.getItem("user")).id,
            sum,
            goods_ids: localStorage.getItem("cart")
        }

        const token = localStorage.getItem("token");

        if (token === null || token === "") {
            alert("You must be logged!")
            return;
        }

        axios.post("http://192.168.1.103:8000/purchase", data, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        .then(response => {
            console.log(response.data);
            alert("Successfully purchased!")
        })
        .then(() => {
            localStorage.setItem("cart", "[]")
            this.setState({goodsInCart: []})
        })
        .catch(err => {
            console.log(err);
            alert("Error, watch console for details!")
        })
    }

    remove = (good) => {
        let result = [...this.state.goodsInCart]
        let index = this.state.goodsInCart.indexOf(good)
        result.splice(index,1)

        let lsResult = JSON.parse(localStorage.getItem("cart"))
        let lsIndex = lsResult.indexOf(good.id)
        lsResult.splice(lsIndex, 1)
        localStorage.setItem("cart",JSON.stringify(lsResult))

        this.setState({
            goodsInCart: [...result]
        })
        this.sumDisplay.innerText = "";
    }

    calcSum = () => {
        const priceList = this.state.goodsInCart.map(good => parseFloat(good.price))
        const sum = priceList.reduce((sum, curVal) => sum + curVal)
        this.sumDisplay.innerText = sum
        this.setState({})
    }

    render() {
        if (this.state.goodsInCart.length === 0) {
            return (
                <div>Cart is empty. Add something in <Link to="/">catalogue</Link><br/></div>
            )
        } else {
            return (
                <div className="cart">
                    <table border="1">
                        <caption><h2>Cart</h2></caption>
                        <tbody>
                            <tr>
                                <th>Naming</th>
                                <th>Price</th>
                                <th>Manufacturer</th>
                                <th>Rate</th>
                                <th>Actions</th>
                            </tr>
                            {this.state.goodsInCart.map(good => (
                                <tr key={good.id}>
                                    <td>{good.naming}</td>
                                    <td>{good.price}$</td>
                                    <td>{good.country}</td>
                                    <td>{good.rate}</td>
                                    <td>
                                        <button onClick={()=>this.remove(good)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3>
                        <span>Total: </span>
                        <span ref={(node) => this.sumDisplay = node}></span>
                        <span>$ </span>
                        <button onClick={this.calcSum}>Calculate total</button>
                    </h3>
                    <button ref={node => this.purchaseButton = node} style={{"width":"100%", "padding":"0.5rem", "backgroundColor":"green", "color": "white"}} onClick={this.purchase}>Purchase</button>
                </div>
            )
        }
    }
}

export default Cart;
