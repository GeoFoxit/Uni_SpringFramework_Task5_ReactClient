import React, { Component } from 'react';
import axios from 'axios';
import nf_png from '../img/nf.png'

class Catalogue extends Component {
    constructor(props) {
        super(props)
        this.state = {
            goods: []
        }
    }

    componentDidMount() {
        axios.get('http://192.168.1.103:8003/')
        .then(data => {
            this.setState({
                goods: data.data 
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    search = () => {
        console.log(this.searchField.value);
    }

    render() {
        if (this.state.goods.length !== 0) {
            return (
                <div className="catalogue">
                    <div className="sidebar">
                        <div>
                            <input type="text" ref={node => this.searchField = node} onChange={this.search}/>
                        </div>
                        <div>
                            <select>
                                <option>Ukraine</option>
                                <option>Germany</option>
                                <option>Italy</option>
                            </select>
                        </div>
                        <div>
                            <input type="radio" />
                            <input type="radio" />
                            <input type="radio" />
                        </div>
                        <div>
                            <input type="checkbox"/>
                            <input type="checkbox"/>
                            <input type="checkbox"/>
                            <input type="checkbox"/>
                            <input type="checkbox"/>
                        </div>
                    </div>
                    <div className="goods">
                        {this.state.goods.map(good => (
                            <div key={good.id} className="good">
                                <img src={nf_png} alt="" srcset=""/>
                                <span>{good.naming}</span>
                                <span>{good.price}$</span>
                                <span>Rate: {good.rate}</span>
                                <button>Details</button>
                                <button>Add to cart</button>
                                <button>Add to compare</button>
                                <button>Like</button>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="catalogue">
                    Catalogue is empty
                </div>
            )
        }
    }
}

export default Catalogue;
