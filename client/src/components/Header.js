import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Consumer} from './Context';

class Header extends Component {

// this will logout the user
logOut = () => {
  this.setState({
    signedIn: false
  })
  window.sessionStorage.clear();
  this.props.history.push('/courses');
}

  render(){
  return (
    <Consumer>
    {context =>{
// this will determine if the user is signed in if they are it will welcome them and display logout button
      if(context.signedIn){
        return(
          <div className="header">
            <div className="bounds">
              <h1 className="header--logo">Courses</h1>
              <nav>
                <span>Welcome {context.user.firstName} {context.user.lastName}</span>
                  <Link to='/courses' className="signin" onClick={this.logOut} >Sign Out</Link>
              </nav>
            </div>
          </div>
        )
      } else {
        return(
          <div className="header">
            <div className="bounds">
              <h1 className="header--logo">Courses</h1>
              <nav>
                <Link to='/signUp' className="signup">Sign Up</Link>
                <Link to='/signIn' className="signin">Sign In</Link>
              </nav>
            </div>
          </div>
        )
      }
    }}
    </Consumer>
    );
  }
}

export default Header;
