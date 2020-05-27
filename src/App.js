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
    logged: false
  }
  
  sign_in = (email, pass) => {
    return axios.post('http://192.168.1.103:8005/login',{
      email, password: pass
    })
    .then(res => {
      return axios.get('http://192.168.1.103:8005/'+res.data)
    })
    .then(userData => {
      localStorage.setItem('user',JSON.stringify(userData.data));
      this.setState({
        logged: true
      });
      return true
    })
    .catch(reason => {
      console.log(reason)
      return false;
    })
  }

  sign_up = (name, email, pass) => {
    // this.setState(
    //   {logged: true}
    // )
    // return true;
    return false;
  }

  sign_out = () => {
    this.setState(
      {logged: false}
    )
  }

  componentDidMount() {
    if (localStorage.getItem('user')) {
      this.setState({
        logged: true
      })
    }
  }

  render() {
    return (
      <Router>
        <div id="app">
          <Header/>
          <Content logged={this.state.logged} sign={{sign_in: this.sign_in, sign_out: this.sign_out, sign_up: this.sign_up}}/>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
