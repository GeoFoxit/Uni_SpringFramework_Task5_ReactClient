import React, { Component } from 'react';
import axios from 'axios';

class EditGood extends Component {
    state = {
        good: null
    }

    componentDidMount() {
        const url = `http://192.168.1.103:8000/good/${this.props.match.params.good_id}`

        axios.get(url)
        .then(data => {
            this.setState({
                good: data.data
            })
        })
        .then(()=> {
            this.namingField.value = this.state.good.naming
            this.priceField.value = this.state.good.price
            this.countryField.value = this.state.good.country
            this.rateField.value = this.state.good.rate
            this.descriptionField.value = this.state.good.description
        })
        .then(()=> {
            this.setState({})
        })
    }

    updateGood = () => {
        const updatedGood = {
            naming: this.namingField.value,
            price: this.priceField.value,
            country: this.countryField.value,
            rate: this.rateField.value,
            description: this.descriptionField.value
        }
        const url = `http://192.168.1.103:8000/good/${this.props.match.params.good_id}`

        const token = localStorage.getItem("token")

        const options = {
            headers: {
                Authorization: "Bearer " + token
            }
        }

        axios.put(url, updatedGood, options)
        .then(data => {
            alert("Successfully updated")
            console.log(data.data);
        })
        .catch(error => {
            alert("Sorry, an error has occurred. Apparently token is no longer valid")
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <input placeholder="Naming" type="text" ref={node => this.namingField = node}/>
                <input placeholder="Price" type="text" ref={node => this.priceField = node}/>
                <input placeholder="Country" type="text" ref={node => this.countryField = node}/>
                <input placeholder="Rate" type="text" ref={node => this.rateField = node}/>
                <input placeholder="Description" type="text" ref={node => this.descriptionField = node}/>
                <button onClick={this.updateGood}>Update</button>
            </div>
        );
    }
}

export default EditGood;
