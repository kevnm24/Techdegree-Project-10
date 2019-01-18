import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      sigendUp: false
    }
  }

  signUp = (firstName, lastName, emailAddress, password) => {
    axios.post('http://localhost:5000/api/users', {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      password: password
   })
   .then(response => {
     if(response.status === 201) {
       this.setState({
         sigendUp: true
       })
     }
   })
   .catch(function (error) {
    console.log(error);
   });
  }

  handleChange = e => {
    this.setState({[e.target.id]: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    if(this.state.password === this.state.confirmPassword){
      this.signUp(this.state.firstName, this.state.lastName, this.state.emailAddress, this.state.password)
    } else {
      alert('passwords do not match')
    }
  }
// this renders the html
render() {
  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign Up</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.handleChange} ref={(input) => this.firstName = input} value={this.state.firstName}></input></div>
            <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.handleChange} ref={(input) => this.lastName = input} value={this.state.lastName}></input></div>
            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.handleChange} ref={(input) => this.emailAddress = input} value={this.state.emailAddress}></input></div>
            <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handleChange} ref={(input) => this.password = input} value={this.state.password}></input></div>
            <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={this.handleChange} ref={(input) => this.confirmPassword = input} value={this.state.confirmPassword}></input></div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary">Cancel</button></div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>Already have a user account? <Link to='/signIn' className="signin">Click here</Link> to sign in!</p>
      </div>
    </div>
    );
  };
};

export default SignUp;
