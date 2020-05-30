import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';

class App extends Component {
  state = { 
    user: null
  }
  
  // Ставим стэйт
  // Ставим сторейдж
  sign_in = (signData) => {
    axios.post("http://192.168.1.103:8000/user/login", signData)
    .then(response => {

      const {token, user} = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user))

      alert("Signed!")
      this.setState({
        user
      })


    })
    .catch(error => {
      alert("Sorry,an error has occurred.")
      console.log(error)
    })
  }

  // Ставим стэйт
  // Ставим сторейдж
  sign_up = (signData) => {
    axios.post("http://192.168.1.103:8000/user/register", signData)
    .then(response => {

      const {token, user} = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user))
      return user

    })
    .then(user => {

      alert("Signed!")
      this.setState({
        user
      })

    })
    .catch(error => {
      alert("Sorry,an error has occurred.")
      console.log(error)
    })

  }

  // Чистим локал сторэйдж
  // чистим стэйт
  sign_out = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this.setState({
      user: null
    })
  }

  //Берём Токен и Юзера с локал сторэйдж
  //и ставим соответсвтующий стэйт
  componentDidMount() {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (token === null || token === "" || user === null || user === "") {
      this.setState({
        user: null
      })
      return;
    }

    this.setState({user: JSON.parse(user)})
  }

  render() {
    const displayUser = this.state.user ? this.state.user : {name: "Profile"}

    return (
      <Router>
        <div id="app">
          <Header user={displayUser}/>
          <Content user={this.state.user} sign={{sign_in: this.sign_in, sign_out: this.sign_out, sign_up: this.sign_up}}/>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
