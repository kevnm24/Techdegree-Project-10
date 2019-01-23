import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Consumer } from './Context'
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
       this.props.logIn(emailAddress, password)
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
    }
  }
// this renders the html
render() {
  let emailVal = null;
  let passVal = null;
  let passMatchVal = null;
  let headingVal = null;

  if (this.state.emailAddress === '') {
    emailVal = <li>Please provide your email address</li>;
    headingVal = <h2 className="validation--errors--label">Validation errors</h2>
  } else {
    emailVal = <li></li>;
  }

  if (this.state.password === '') {
    passVal = <li>Please provide a password</li>;
    headingVal = <h2 className="validation--errors--label">Validation errors</h2>
  } else {
    passVal = <li></li>;
  }

  if(this.state.password !== this.state.confirmPassword){
    passMatchVal = <li>Passwords do not match</li>;
    headingVal = <h2 className="validation--errors--label">Validation errors</h2>
  } else{
    passMatchVal = <li></li>;
  }
  return (
    <Consumer>
      {context => {
        if (context.signedIn){
          this.props.history.push('/courses')
        }
    return(
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign Up</h1>
          <div>
          <div>
            {headingVal}
            <div className="validation-errors">
              <ul>
                {emailVal}
                {passVal}
                {passMatchVal}
              </ul>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.handleChange} ref={(input) => this.firstName = input} value={this.state.firstName}></input></div>
            <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.handleChange} ref={(input) => this.lastName = input} value={this.state.lastName}></input></div>
            <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.handleChange} ref={(input) => this.emailAddress = input} value={this.state.emailAddress}></input></div>
            <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.handleChange} ref={(input) => this.password = input} value={this.state.password}></input></div>
            <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={this.handleChange} ref={(input) => this.confirmPassword = input} value={this.state.confirmPassword}></input></div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary">Cancel</button></div>
          </form>
        </div>
        <li>&nbsp;</li>
        <li>Already have a user account? <Link to='/signIn' className="signin">Click here</Link> to sign in!</li>
      </div>
    </div>
    )
    }}
  </Consumer>
    );
  };
};

export default withRouter(SignUp)
