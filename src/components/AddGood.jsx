import React, { Component } from 'react';
import axios from 'axios';

class AddGood extends Component {

    createGood = () => {
        const good = {
            naming: this.namingField.value,
            price: this.priceField.value,
            country: this.countryField.value,
            rate: this.rateField.value,
            description: this.descriptionField.value            
        }
        const token = localStorage.getItem("token")
        const options = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        axios.post("http://192.168.1.103:8000/good", good, options)
        .then(data => data.data)
        .then(data => {
            alert("Good has created")
            console.log(data);
        })
        .then(()=> {
            this.namingField.value = ""
            this.priceField.value = ""
            this.countryField.value = ""
            this.rateField.value = ""
            this.descriptionField.value = ""
        })
        .catch(error => {
            alert("Sorry, an error has occurred")
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
                <button onClick={this.createGood}>Create</button>
            </div>
        );
    }
}

export default AddGood;
