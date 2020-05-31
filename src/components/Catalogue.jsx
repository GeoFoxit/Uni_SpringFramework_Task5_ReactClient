import React, { Component } from 'react';
import axios from 'axios';
import nf_png from '../img/nf.png'

import {Link} from 'react-router-dom'

class Catalogue extends Component {
    state = {
        goods: [],
        searchedGoods: [],
        filteredByRateGoods: [],
        filteredByPriceGoods: [],
        filteredByCountryGoods: [],
        foundedGoods: []
    }

    componentDidMount() {
        axios.get('http://192.168.1.103:8000/good')
        .then(data => {
            this.setState({
                goods: data.data 
            })
        })
        .catch(error => {
            alert("Sorry, error loading catalogue.")
            console.log(error);
        })
    }

    search = () => {
        this.setState({
            foundedGoods: this.state.goods.filter(good => good.naming.includes(this.searchField.value))
        })
    }

    rateFilter = () => {
        let result = []

        let withRate1 = this.state.goods.filter(good => good.rate === 1)
        let withRate2 = this.state.goods.filter(good => good.rate === 2)
        let withRate3 = this.state.goods.filter(good => good.rate === 3)
        let withRate4 = this.state.goods.filter(good => good.rate === 4)
        let withRate5 = this.state.goods.filter(good => good.rate === 5)

        if (this.rateField1.checked) {
            result.push(...withRate1)
        }
        if (this.rateField2.checked) {
            result.push(...withRate2)
        }
        if (this.rateField3.checked) {
            result.push(...withRate3)
        }
        if (this.rateField4.checked) {
            result.push(...withRate4)
        }
        if (this.rateField5.checked) {
            result.push(...withRate5)
        }

        this.setState({
            foundedGoods: result
        })
    }

    countryFilter = (e) => {
        if (e.target.value === "All") {
            this.setState({
                foundedGoods: [...this.state.goods]
            })
            return;
        }
        this.setState({
            foundedGoods: this.state.goods.filter(good => good.country === e.target.value)
        })
    }
    
    priceFilter = () => {
        let result = [];

        let cheap = this.state.goods.filter(good => good.price <= 200)
        let normal = this.state.goods.filter(good => good.price > 200 && good.price <= 600)
        let expensive = this.state.goods.filter(good => good.price > 600)

        if (this.cheapRadio.checked) {
            result.push(...cheap)
        }
        if (this.normalRadio.checked) {
            result.push(...normal)
        }
        if (this.expensiveRadio.checked) {
            result.push(...expensive)
        }
        if (this.allRadio.checked) {
            result.push(...this.state.goods)
        }

        this.setState({
            foundedGoods: result
        })
    }

    addToCart = (id) => {
        if (localStorage.getItem("cart") === null) {
            localStorage.setItem("cart", JSON.stringify([]))
        }

        let cart = JSON.parse(localStorage.getItem("cart"));
        if (cart.includes(id)) {
            return;
        } else {
            cart.push(id)
            localStorage.setItem("cart", JSON.stringify(cart))
        }
    }

    addToCompare = (id) => {
        if (localStorage.getItem("compare") === null) {
            localStorage.setItem("compare", JSON.stringify([]))
        }

        let compare = JSON.parse(localStorage.getItem("compare"));
        if (compare.includes(id)) {
            return;
        } else {
            compare.push(id)
            localStorage.setItem("compare", JSON.stringify(compare))
        }
    }

    render() {
        let addGood = null;
        let user = localStorage.getItem("user")
        if (user !== null && user !== "" && user !== undefined) {
            user = JSON.parse(user)
            if (user.role === "ROLE_ADMIN") {
                addGood = <Link style={{"fontSize":"1.5rem", "color":"green"}} to={'/addgood'}>+</Link>
            }
        }

        if (this.state.goods.length !== 0) {
            let goodList = this.state.goods
            if (this.state.foundedGoods.length !== 0 ) {
                goodList = this.state.foundedGoods
            }
            return (
                <div className="catalogue">
                    <div className="sidebar">
                        <div>
                            <input type="text" ref={node => this.searchField = node} onChange={this.search} placeholder="Search"/>
                        </div>
                        <div>
                            Country: 
                            <select onChange={this.countryFilter}>
                                <option>All</option>
                                <option>Ukraine</option>
                                <option>Germany</option>
                                <option>Italy</option>
                            </select>
                        </div>
                        <div className="priceFilter">
                            <label>Cheap<input type="radio" name="price" ref={node => this.cheapRadio = node} onChange={this.priceFilter}/></label>
                            <label>Normal<input type="radio" name="price" ref={node => this.normalRadio = node} onChange={this.priceFilter}/></label>
                            <label>Expensive<input type="radio" name="price" ref={node => this.expensiveRadio = node} onChange={this.priceFilter}/></label>
                            <label>All<input type="radio" name="price" ref={node => this.allRadio = node} onChange={this.priceFilter}/></label>
                        </div>
                        <div className="searchByRate">
                            <label>1 star<input type="checkbox" ref={node => this.rateField1 = node} onChange={this.rateFilter}/></label>
                            <label>2 star<input type="checkbox" ref={node => this.rateField2 = node} onChange={this.rateFilter}/></label>
                            <label>3 star<input type="checkbox" ref={node => this.rateField3 = node} onChange={this.rateFilter}/></label>
                            <label>4 star<input type="checkbox" ref={node => this.rateField4 = node} onChange={this.rateFilter}/></label>
                            <label>5 star<input type="checkbox" ref={node => this.rateField5 = node} onChange={this.rateFilter}/></label>
                        </div>
                    </div>
                    <div className="goods">
                        {addGood}
                        {goodList.map(good => (
                        <div key={good.id} className="good">
                            <img src={nf_png} alt=""/>
                            <span>{good.naming}</span>
                            <span>{good.price}$</span>
                            <span>Rate: {good.rate}</span>
                            <Link to={"/details/"+good.id}><button>Details</button></Link>
                            <button onClick={() => this.addToCart(good.id)}>Add to cart</button>
                            <button onClick={() => this.addToCompare(good.id)}>Add to compare</button>
                        </div>
                        ))}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="catalogue">
                    Catalogue is empty. {addGood}
                </div>
            )
        }
    }
}

export default Catalogue;
