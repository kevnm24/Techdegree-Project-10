import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Button from 'react-bootstrap/lib/Button';

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      emailAddress: '',
      password: ''
    };
  }

  validateForm() {
    return this.state.emailAddress.length > 0 && this.state.password.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("User Email : " + this.state.emailAddress)
    const url = 'http://localhost:5000/api/users'
    const data = {emailAddress:this.state.emailAddress, password:this.state.password}
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  }

// this renders the html
render() {
  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="emailAddress" bsSize="large">
              <FormControl
                placeholder="Email Address"
                autoFocus
                type="emailAddress"
                value={this.state.emailAddress}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <FormControl
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <Button disabled={!this.validateForm()} className="button" type="submit">Sign Up</Button>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>Don't have a user account? <NavLink to='/signUp' className="signin">Click here</NavLink> to sign up!</p>
      </div>
    </div>
    );
  };
};

export default SignIn;
