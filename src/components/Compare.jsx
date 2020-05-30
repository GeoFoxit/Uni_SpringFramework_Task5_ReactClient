import React, { Component } from 'react';
import axios from 'axios';

class Compare extends Component {
    state = {
        goodsToCompare: []
    }

    componentDidMount() {
        const compareInStorage = localStorage.getItem("compare")
        
        if (compareInStorage === null || compareInStorage === "") {
            localStorage.setItem("compare", JSON.stringify([]))
            return;
        }

        const goodList = JSON.parse(compareInStorage)
        
        let result = []
        for (let i = 0; i < goodList.length; i++) {
            axios.get(`http://192.168.1.103:8000/good/${goodList[i]}`)
            .then(res => {
                result.push(res.data)
            })
            .then(()=>{
                this.setState({goodsToCompare: result})
            })
            .catch(res => {
                console.log("Error!");
                this.setState({goodsToCompare: []})
                return;
            })
        } 
    }

    deleteGood = (good) => {
        let result = [...this.state.goodsToCompare]
        let index = this.state.goodsToCompare.indexOf(good)
        result.splice(index,1)

        let lsResult = JSON.parse(localStorage.getItem("compare"))
        let lsIndex = lsResult.indexOf(good.id)
        lsResult.splice(lsIndex, 1)
        localStorage.setItem("compare",JSON.stringify(lsResult))

        this.setState({
            goodsToCompare: [...result]
        })
    }

    addToCart = (good) => {
        if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === "") {
            localStorage.setItem("cart", JSON.stringify([]))
        }

        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart.includes(good.id)) {
            return;
        } else {
            cart.push(good.id)
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }

    render() {
        if (this.state.goodsToCompare.length === 0) {
            return (
                <div>Nothing to compare.<br/></div>
            )
        } else {
            return (
                <div className="compare">
                    <table border="1">
                        <caption><h2>Compare table</h2></caption>
                        <tbody>
                            <tr>
                                <th>Naming</th>
                                <th>Price</th>
                                <th>Manufacturer</th>
                                <th>Rate</th>
                                <th>Actions</th>
                            </tr>
                            {this.state.goodsToCompare.map(good => (
                                <tr key={good.id}>
                                    <td>{good.naming}</td>
                                    <td>{good.price}$</td>
                                    <td>{good.country}</td>
                                    <td>{good.rate}</td>
                                    <td>
                                        <div>
                                        <button onClick={()=>this.addToCart(good)}>Add to cart</button>
                                        <button onClick={()=>this.deleteGood(good)}>Remove</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default Compare;
