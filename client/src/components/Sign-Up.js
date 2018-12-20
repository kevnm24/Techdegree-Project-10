import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class SignUp extends Component {

// this renders the html
render() {
  // var {isLoaded, courses} = this.state;
  // if (!isLoaded) {
  //   return <div>Loading...</div>;
  // };
  return (
    <div class="bounds">
      <div class="grid-33 centered signin">
        <h1>Sign Up</h1>
        <div>
          <form>
            <div><input id="firstName" name="firstName" type="text" class="" placeholder="First Name" value=""></input></div>
            <div><input id="lastName" name="lastName" type="text" class="" placeholder="Last Name" value=""></input></div>
            <div><input id="emailAddress" name="emailAddress" type="text" class="" placeholder="Email Address" value=""></input></div>
            <div><input id="password" name="password" type="password" class="" placeholder="Password" value=""></input></div>
            <div><input id="confirmPassword" name="confirmPassword" type="password" class="" placeholder="Confirm Password" value=""></input></div>
            <div class="grid-100 pad-bottom"><button class="button" type="submit">Sign Up</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button></div>
          </form>
        </div>
        <p>&nbsp;</p>
        <p>Already have a user account? <NavLink to='/signIn' className="signin">Click here</NavLink> to sign in!</p>
      </div>
    </div>
    );
  };
};

export default SignUp;
