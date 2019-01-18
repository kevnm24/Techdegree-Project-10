import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Consumer } from './Context'
import {withRouter} from 'react-router';

class SignIn extends Component {

  constructor() {
    super();
    this.state = {
      user: '',
      password: '',
    }
  }

  Name = e => { this.setState({user: e.target.value}) }
  Pass = e => { this.setState({password: e.target.value}) }

  handleSubmit = e => {
    e.preventDefault();
    this.props.logIn(this.state.user, this.state.password)
  }

// this renders the html
render() {
  return (
    <Consumer>
      {context => {
        if (context.signedIn){
          this.props.history.push('/courses')
        }
    return(
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div><input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" onChange={this.Name} ref={(input) => this.user = input} value={this.state.user}></input></div>
              <div><input id="password" name="password" type="password" placeholder="Password" onChange={this.Pass} ref={(input) => this.password = input} value={this.state.password}></input></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><Link to="/courses"><button className="button button-secondary">Cancel</button></Link></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <a href="/Sign-up">Click here</a> to sign up!</p>
        </div>
      </div>
        )
      }}
    </Consumer>
    );
  };
};
export default withRouter (SignIn);
